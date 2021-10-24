import { DateTime } from "luxon";
import bcrypt from "bcryptjs";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (!body.code || !body.password) {
    return CreateResponse(400, { message: "Dados inválidos!" });
  }
  try {
    const { Users, ForgotPassword } = await database();
    const forgotPassword = await ForgotPassword.findOne({
      where: { code: body.code },
    });
    if (!forgotPassword) {
      return CreateResponse(404, { message: "Código não encontrado!" });
    }
    const dt = DateTime.now();
    const forgotPasswordDate = DateTime.fromJSDate(forgotPassword.expiryDate);
    if (dt <= forgotPasswordDate) {
      const user = await Users.findOne({
        where: { email: forgotPassword.email },
      });
      if (!user) {
        return CreateResponse(404, { message: "Usuário não encontrado!" });
      }
      user.update({ password: bcrypt.hashSync(body.password, 8) });
      await ForgotPassword.destroy({ where: { id: forgotPassword.id } });
      return CreateResponse(200, { message: "Password changed successfully!" });
    } else {
      return CreateResponse(401, { message: "Código expirado!" });
    }
  } catch (err) {
    return CreateResponse(err.statusCode || 500, err.message);
  }
};
