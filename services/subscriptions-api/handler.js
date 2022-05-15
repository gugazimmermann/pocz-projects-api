import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { LambdaTypes, creditCards, payments, plans, subscriptions } from './index';

export const handler = async (event) => {
  if (event.routeKey === LambdaTypes.Plans) return await plans();
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (event.routeKey === LambdaTypes.CreditCards) return await creditCards(user.id);
  if (event.routeKey === LambdaTypes.Payments) return await payments(user.id);
  if (event.routeKey === LambdaTypes.Subscriptions) return await subscriptions(user.id);
  return CreateResponse(500, { message: 'No Event Type!' });
};
