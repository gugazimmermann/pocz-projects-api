import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    if (!user)
      return CreateResponse(404, { message: "Usuário não encontrado!" });
    return CreateResponse(200, {
      active: user.active,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
