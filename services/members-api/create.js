import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOne as findOneUser } from "../profiles-api/utils";
import { createUser } from "../auth-api/utils";
import { findOneInvite } from "./utils";

export const handler = async (event, context) => {
  const { code, password } = JSON.parse(event?.body);
  if (!code || !password)
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const invite = await findOneInvite(code, user.tenant);
    if (!invite)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    const mainUser = await findOneUser(invite.userId, user.tenant);
    if (!mainUser)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    await createUser({
      name: invite.name,
      email: invite.email,
      password: password,
      tenant: user.tenant,
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
