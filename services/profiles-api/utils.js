import { Op } from "sequelize";
import database from "../../libs/connection";

export function resultToData(resultData) {
  return {
    id: resultData?.id || "",
    isAdmin:
      resultData.roles &&
      resultData.roles.length &&
      resultData.roles[0].name === "Admin"
        ? true
        : false,
    isProfessional:
      resultData.subscription && resultData.subscription.type === "professional"
        ? true
        : false,
    avatar: resultData?.profile?.avatar || "",
    name: resultData?.profile?.name || "",
    email: resultData?.profile?.email || "",
    phone: resultData?.profile?.phone || "",
    zip: resultData?.profile?.zip || "",
    address: resultData?.profile?.address || "",
    number: resultData?.profile?.number || "",
    complement: resultData?.profile?.complement || "",
    neighborhood: resultData?.profile?.neighborhood || "",
    city: resultData?.profile?.city || "",
    state: resultData?.profile?.state || "",
    subscription: {
      planId: resultData?.subscription?.planId || "",
      type: resultData?.subscription?.type || "",
      reason: resultData?.subscription?.reason || "",
      frequency: resultData?.subscription?.frequency || 0,
      createdAt:
        resultData.subscription && resultData.subscription.createdAt
          ? resultData.subscription.createdAt.toString()
          : "",
    },
  };
}

export async function findOne(id, tenantId) {
  const { Users } = await database();
  const where = { id };
  if (tenantId) where.tenant = tenantId;
  const data = await Users.findOne({
    where,
    include: ["subscription", "profile", "roles"],
  });
  return data;
}

export async function findAll(id, tenantId) {
  const { Users } = await database();
  const where = { id: { [Op.not]: id } };
  if (tenantId) where.tenant = tenantId;
  const data = await Users.findAll({
    where,
    include: ["subscription", "profile", "roles"],
  });
  return data;
}
