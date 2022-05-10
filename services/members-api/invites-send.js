import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { sendInviteEmail } from "../../libs/emails/invite";
import { findOne } from "../shared/profiles-utils";

export const invitesSend = async (tenantId, userId, id) => {
  if (!id) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const userData = await findOne(userId, tenantId);
    if (!userData || !userData.subscription || !userData.profile) return CreateResponse(404, { message: "Registro não encontrado!" });
    const { Invites, Profiles } = await database();
    const invite = await Invites.findByPk(id);
    if (!invite) return CreateResponse(404, { message: "Registro não encontrado!" });
    const profile = await Profiles.findOne({ where: { email: invite.email } });
    if (profile) return CreateResponse(403, { message: "Convite já foi aceito!" });
    invite.changed("updatedAt", true);
    await invite.save();
    await sendInviteEmail({ name: invite.name, email: invite.email, code: invite.code, tenantId: invite.tenantId, user: userData.profile.name });
    return CreateResponse(202, { message: "Convite Enviado!" });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
