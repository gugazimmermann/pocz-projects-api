import bcrypt from "bcryptjs";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import CreateError from "../../libs/error";
import { validateEmail } from "../../libs/utils";

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (
    !body.name ||
    !body.password ||
    !body.email ||
    !validateEmail(body.email) ||
    !body.planId
  ) {
    return CreateResponse(400, { message: "Dados inválidos!" });
  }
  try {
    const {
      Sequelize,
      Plans,
      Users,
      Roles,
      Profiles,
      Subscriptions,
      CreditCards,
      Payments,
    } = await database();
    await Sequelize.transaction(async () => {
      const userPlan = await Plans.findByPk(body.planId);
      if (userPlan.transactionAmount !== 0 && !body.cardInfo) {
        throw CreateError(400, "Dados inválidos!");
      }
      const emailExists = await Users.findOne({ where: { email: body.email } });
      if (emailExists) {
        throw CreateError(400, "Email já está cadastrado!");
      }
      const userData = {
        email: body.email,
        password: bcrypt.hashSync(body.password, 8),
        active: true,
      };
      const user = await Users.create(userData);
      await user.update({ tenant: user.id });
      const role = await Roles.findOne({ where: { name: "Admin" } });
      await user.addRole(role);
      await Profiles.create({
        name: body.name,
        email: body.email,
        userId: user.id,
      });
      const subscription = await Subscriptions.create({
        reason: userPlan.reason,
        frequency: userPlan.frequency,
        frequencyType: userPlan.frequencyType,
        transactionAmount: userPlan.transactionAmount,
        status: true,
        type: userPlan.type,
        planId: userPlan.id,
        userId: user.id,
      });
      if (userPlan.transactionAmount !== 0) {
        const { cardInfo } = body;
        // const preapproval = await mercadopago.preapproval.create({
        //   "preapproval_plan_id": userPlan.preapprovalPlanId,
        //   "card_token_id": cardInfo.id,
        //   "payer_email": user.email
        // });
        // console.log(preapproval)
        const creditCard = await CreditCards.create({
          name: cardInfo.name,
          firstSixDigits: cardInfo.firstSixDigits,
          lastFourDigits: cardInfo.lastFourDigits,
          expirationMonth: cardInfo.expirationMonth,
          expirationYear: cardInfo.expirationYear,
          status: true,
          userId: user.id,
        });
        await Payments.create({
          transactionAmount: userPlan.transactionAmount,
          status: "Paid",
          paidDate: new Date(),
          subscriptionId: subscription.id,
          creditCardId: creditCard.id,
          userId: user.id,
        });
      }
    });
    return CreateResponse(201, { message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, err.message);
  }
};
