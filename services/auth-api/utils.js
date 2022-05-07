import bcrypt from "bcryptjs";
import database from "../../libs/connection";

export async function createUser({ name, email, password, tenant, roleName, subscription }) {
  const { Users, Roles, Profiles, Subscriptions } = await database();
  const userData = { email: email, password: bcrypt.hashSync(password, 8), active: true };
  if (tenant) userData.tenant = tenant;
  const user = await Users.create(userData);
  if (!tenant) await user.update({ tenant: user.id });
  const role = await Roles.findOne({ where: { name: roleName } });
  await user.addRole(role);
  await Profiles.create({ name: name, email: email, userId: user.id });
  const subscriptionData = await Subscriptions.create({
    reason: subscription.reason,
    frequency: subscription.frequency,
    frequencyType: subscription.frequencyType,
    transactionAmount: subscription.transactionAmount,
    status: true,
    type: subscription.type,
    planId: subscription.planId,
    userId: user.id,
  });
  return { user: user, subscription: subscriptionData };
}

export async function createUserPayment({ userId, cardInfo, transactionAmount, subscriptionId }) {
  const { CreditCards, Payments } = await database();
  // const preapproval = await mercadopago.preapproval.create({
  //   "preapproval_plan_id": userPlan.preapprovalPlanId,
  //   "card_token_id": cardInfo.id,
  //   "payer_email": user.email
  // });
  // console.log(preapproval)
  const creditcard = await CreditCards.create({
    name: cardInfo.name,
    firstSixDigits: cardInfo.firstSixDigits,
    lastFourDigits: cardInfo.lastFourDigits,
    expirationMonth: cardInfo.expirationMonth,
    expirationYear: cardInfo.expirationYear,
    status: true,
    userId: userId,
  });
  await Payments.create({
    transactionAmount: transactionAmount,
    status: "Paid",
    paidDate: new Date(),
    subscriptionId: subscriptionId,
    creditcardId: creditcard.id,
    userId: userId,
  });
}
