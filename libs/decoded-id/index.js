import database from '../connection';
import CreateError from '../error';

async function DecodedId(event) {
  const principalId = event?.requestContext?.authorizer?.jwt?.claims?.id || null;
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
