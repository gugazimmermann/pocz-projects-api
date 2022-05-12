import jwt from "jsonwebtoken";
import config from "../../libs/jwt-config";
import database from '../connection';
import CreateError from '../error';

async function DecodedId(event) {
  const Authorization = event.headers?.Authorization || event.headers?.authorization;
  const id = Authorization ? jwt.verify(Authorization.replace("Bearer ", ""), config.jwtSecret).id : null;
  const principalId = event.requestContext?.authorizer?.principalId || id;
  if (!principalId) return CreateError(400, 'Autorização não encontrada!');
  try {
    const { Users } = await database();
    const user = await Users.findByPk(principalId);
    if (!user) return CreateError(404, 'Usuário não encontrado!');
    return user;
  } catch (err) {
    return CreateError(401, 'Não Autorizado!');
  }
}

export default DecodedId;
