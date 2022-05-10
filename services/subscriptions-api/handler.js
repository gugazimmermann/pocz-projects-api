import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { LambdaTypes, creditCards, payments, plans, subscriptions } from './index';

export const handler = async (event) => {
  const body = JSON.parse(event?.body);
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (body.type === LambdaTypes.CreditCards) return await creditCards(user);
  if (body.type === LambdaTypes.Payments) return await payments(user);
  if (body.type === LambdaTypes.Plans) return await plans();
  if (body.type === LambdaTypes.Subscriptions) return await subscriptions(user);
  return CreateResponse(500, { message: 'No Event Type!' });
};
