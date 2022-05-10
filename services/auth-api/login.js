import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import config from "../../libs/jwt-config";
import { validateEmail } from "../../libs/utils";

export const login = async ({ email, password }) => {
  if (!email || !validateEmail(email) || !password) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { Users, RefreshToken } = await database();
    const user = await Users.findOne({ where: { email }, include: "subscription" });
    if (!user) return CreateResponse(404, { message: "Email ou senha inválidos!" });
    if (!user.active) return CreateResponse(401, { message: "Cadastro Inativo!" });
    if (!user.subscription) return CreateResponse(404, { message: "Assinatura não encontrada!" });
    if (!bcrypt.compareSync(password, user.password)) return CreateResponse(404, { message: "Email ou senha inválidos!" });
    const accessToken = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiration });
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
    const refreshToken = await RefreshToken.create({ token: uuidv4(), expiryDate: expiredAt, userId: user.id, });
    return CreateResponse(200, { auth: true, status: "SUCCESS", accessToken, refreshToken, tenant: user.tenant });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
