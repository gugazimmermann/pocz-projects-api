import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";
import { sendForgotPasswordEmail } from "../../libs/emails/forgot-password";

export const forgotPassword = async ({ email }) => {
  if (!email || !validateEmail(email)) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Users, ForgotPassword } = await database();
    const user = await Users.findOne({ where: { email } });
    if (!user) return CreateResponse(404, { message: "Usuário não encontrado!" });
    if (!user.active)  return CreateResponse(401, { message: "Cadastro Inativo!" });
    const expiryDate = DateTime.now().plus({ hours: 1 });
    const forgotPasswordParams = {
      email: email,
      date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss"),
      code: +Math.random().toString().substring(2, 6),
      codeUrl: uuidv4(),
    };
    await ForgotPassword.create({
      email: forgotPasswordParams.email,
      code: forgotPasswordParams.code,
      codeurl: forgotPasswordParams.codeUrl,
      expiryDate: expiryDate.toJSDate(),
    });
    await sendForgotPasswordEmail(forgotPasswordParams);
    return CreateResponse(200, { email: forgotPasswordParams.email,  date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss") });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
