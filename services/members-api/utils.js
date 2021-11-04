import database from "../../libs/connection";

export function usersResultToData(resultData) {
  return {
    id: resultData.id,
    name: resultData?.profile?.name || "",
    avatar: resultData?.profile?.avatar || "",
    phone: resultData?.profile?.phone || "",
    email: resultData?.profile?.email || "",
    role:
      (resultData?.roles &&
        resultData.roles.length &&
        resultData.roles[0].name) ||
      "",
    active: resultData?.active || false,
  };
}

export function usersResultToListData(resultData) {
  return {
    id: resultData.id,
    name: resultData?.profile?.name || "",
    avatar: resultData?.profile?.avatar || "",
    active: resultData?.active || false,
  };
}

export function invitesResultToData(resultData) {
  return {
    id: resultData.id,
    name: resultData.name,
    email: resultData.email,
    updatedAt: resultData.updatedAt,
  };
}

export async function findAllInvites(tenantId) {
  const { Invites } = await database();
  const data = await Invites.findAll({
    where: { tenantId },
  });
  return data;
}

export async function findOneInvite(code, tenantId) {
  const { Invites } = await database();
  const data = await Invites.findOne({ where: { tenantId, code } });
  return data;
}
