import CreateResponse from "../../libs/response";
import { findOne } from "../shared/profiles-utils";
import { createUser } from "../auth-api/utils";
import { findOneInvite } from "./utils";

export const create = async (tenantId, {code, password}) => {
  if (!code || !password) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const invite = await findOneInvite(code, tenantId);
    if (!invite) return CreateResponse(404, { message: "Registro não encontrado!" });
    const mainUser = await findOne(invite.userId, tenantId);
    if (!mainUser) return CreateResponse(404, { message: "Registro não encontrado!" });
    await createUser({
      name: invite.name,
      email: invite.email,
      password: password,
      tenant: tenantId,
      roleName: "User",
      subscription: {
        reason: mainUser.subscription.reason,
        frequency: mainUser.subscription.frequency,
        frequencyType: mainUser.subscription.frequencyType,
        transactionAmount: mainUser.subscription.transactionAmount,
        status: true,
        type: mainUser.subscription.type,
        planId: mainUser.subscription.planId,
      },
    });
    await invite.destroy();
    return CreateResponse(201, { message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
