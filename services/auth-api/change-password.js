import { DateTime } from "luxon";
import bcrypt from "bcryptjs";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const changePassword = async ({ code, password }) => {
  if (!code || !password) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Users, ForgotPassword } = await database();
    const forgotPassword = await ForgotPassword.findOne({ where: { code } });
    if (!forgotPassword) return CreateResponse(404, { message: "Código não encontrado!" });
    const dt = DateTime.now();
    const forgotPasswordDate = DateTime.fromJSDate(forgotPassword.expiryDate);
    if (dt <= forgotPasswordDate) {
      const user = await Users.findOne({ where: { email: forgotPassword.email }  });
      if (!user) return CreateResponse(404, { message: "Usuário não encontrado!" });
      user.update({ password: bcrypt.hashSync(password, 8) });
      await ForgotPassword.destroy({ where: { id: forgotPassword.id } });
      return CreateResponse(200, { message: "Password changed successfully!" });
    } else {
      return CreateResponse(401, { message: "Código expirado!" });
    }
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
