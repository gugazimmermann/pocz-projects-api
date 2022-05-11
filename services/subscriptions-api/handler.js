import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { LambdaTypes, creditCards, payments, plans, subscriptions } from './index';

export const handler = async (event) => {
  const { path } = event.requestContext?.http;
  if (path === LambdaTypes.Plans) return await plans();
  const user = await DecodedId(event);
  if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
  if (path === LambdaTypes.CreditCards) return await creditCards(user);
  if (path === LambdaTypes.Payments) return await payments(user);
  if (path === LambdaTypes.Subscriptions) return await subscriptions(user);
  return CreateResponse(500, { message: 'No Event Type!' });
};
