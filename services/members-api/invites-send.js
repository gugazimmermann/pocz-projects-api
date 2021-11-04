import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import sendInviteEmail from "../../libs/emails/invite";
import { findOne as findOneUser } from "../profiles-api/utils";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const userData = await findOneUser(user.id);
    if (!userData || !userData.subscription || !userData.profile) {
      return CreateResponse(404, { message: "Registro não encontrado!" });
    }
    const { Invites, Profiles } = await database();
    const invite = await Invites.findByPk(id);
    if (!invite)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    const profile = await Profiles.findOne({ where: { email: invite.email } });
    if (profile)
      return CreateResponse(403, { message: "Convite já foi aceito!" });
    invite.changed("updatedAt", true);
    await invite.save();
    await sendInviteEmail({
      name: invite.name,
      email: invite.email,
      code: invite.code,
      tenantId: invite.tenantId,
      user: userData.profile.name,
    });
    return CreateResponse(202, { message: "Convite Enviado!" });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
