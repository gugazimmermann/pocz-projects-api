import { Op } from "sequelize";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";
import { sendInviteEmail } from "../../libs/emails/invite";
import { findOne } from "../shared/profiles-utils";
import { invitesResultToData } from "./utils";

export const invitesCreate = async (tenantId, userId, { name, email }) => {
  if (!name || !email || !validateEmail(email)) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const userData = await findOne(userId, tenantId);
    if (!userData || !userData.subscription || !userData.profile) return CreateResponse(404, { message: "Registro não encontrado!" });
    const { Invites, Users } = await database();
    if (userData.subscription.type !== "professional") {
      const countMembers = await Invites.count({ where: { tenantId: userData.tenant } });
      const countUsers = await Users.count({ where: { id: { [Op.not]: userData.id, }, tenant: userData.tenant } });
      if (countMembers > 0 || countUsers > 0) return CreateResponse(401, { message: "Plano sem permissão!" });
    }
    const seeEmail = await Invites.findOne({ where: { email } });
    if (seeEmail) return CreateResponse(401, { message: "Convite já criado, tente enviar novamente!" });
    const member = { name, email, code: Math.random().toString().substring(2, 8), userId: userData.id, tenantId: userData.tenant };
    const resultData = await Invites.create(member);
    await sendInviteEmail({ ...member, user: userData.profile.name });
    return CreateResponse(200, { data: invitesResultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
