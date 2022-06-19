import sharp from 'sharp';
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";
import { resultToData } from "../shared/profiles-utils";
import { sendToBucket, deleteFromBucket } from "../shared/s3-utils";

export const update = async (userId, tenantId, { name, email, address, number, complement, neighborhood, city, state, phone, zip, files }) => {
  if (!name || !email || !validateEmail(email) || !address || !city || !state || !phone || !zip )
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Profiles } = await database();
    const resultData = await Profiles.findOne({ where: { userId } });
    if (!resultData) return CreateResponse(404, { message: "Registro não encontrado!" });
    await resultData.update({ name, email, address, number, complement, neighborhood, city, state, phone, zip });
    if (files.length) {
      const avatarPath = avatarName(tenantId, userId);
      const resizedAvatar = await resizeAvatar(files[0].content);
      if (resizedAvatar) {
        const response = await sendToBucket(avatarPath, resizedAvatar);
        if (response['$metadata']?.httpStatusCode === 200) {
          await deleteFromBucket(resultData.avatar);
          await resultData.update({ avatar: avatarPath });
        }
      }
    }
    const data = await Profiles.findOne({ where: { userId } });
    return CreateResponse(200, { body: resultToData(data) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};

function avatarName(tenantId, userId) {
  const d = new Date();
  const now = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`;
  return `${tenantId.split("-").join("")}/${userId.split("-").join("")}${now}.jpg`;
}

async function resizeAvatar(file) {
  try {
    return await sharp(file).resize(240, 240).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  } catch (error) {
    console.log("resizeAvatar Error", error);
    return null;
  }
}
