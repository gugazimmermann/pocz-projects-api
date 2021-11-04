import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import CreateError from "../../libs/error";
import { validateEmail } from "../../libs/utils";
import { createUser, createUserPayment } from "./utils";

export const handler = async (event, context) => {
  const { name, email, password, planId, cardInfo } = JSON.parse(event?.body);
  if (!name || !email || !validateEmail(email) || !password || !planId)
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Sequelize, Plans, Users } = await database();
    await Sequelize.transaction(async () => {
      const userPlan = await Plans.findByPk(planId);
      if (!userPlan) return CreateError(400, { message: "Dados inválidos!" });
      const emailExists = await Users.findOne({ where: { email: email } });
      if (emailExists) throw CreateError(400, "Email já está cadastrado!");
      const { user, subscription } = await createUser({
        name: name,
        email: email,
        password: password,
        tenant: undefined,
        roleName: "Admin",
        subscription: {
          reason: userPlan.reason,
          frequency: userPlan.frequency,
          frequencyType: userPlan.frequencyType,
          transactionAmount: userPlan.transactionAmount,
          status: true,
          type: userPlan.type,
          planId: userPlan.id,
        },
      });

      if (userPlan.transactionAmount !== 0) {
        if (!cardInfo) throw CreateError(400, "Dados inválidos!");
        await createUserPayment({
          userId: user.id,
          cardInfo: {
            name: cardInfo.name,
            firstSixDigits: cardInfo.firstSixDigits,
            lastFourDigits: cardInfo.lastFourDigits,
            expirationMonth: cardInfo.expirationMonth,
            expirationYear: cardInfo.expirationYear,
            status: true,
            userId: user.id,
          },
          subscriptionId: subscription.id,
          transactionAmount: userPlan.transactionAmount,
        });
      }
    });
    return CreateResponse(201, { message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return CreateResponse(err.statusCode, err.message);
  }
};
