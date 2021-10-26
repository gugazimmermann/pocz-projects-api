import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (!body.codeurl) {
    return CreateResponse(400, { message: "Dados inválidos!" });
  }
  try {
    const { ForgotPassword } = await database();
    const forgotPassword = await ForgotPassword.findOne({
      where: { codeurl: body.codeurl },
    });
    if (!forgotPassword) {
      return CreateResponse(404, { message: "Código não encontrado!" });
    }
    return CreateResponse(200, { code: forgotPassword.code });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
