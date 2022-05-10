/* eslint-disable no-unneeded-ternary */
import { Op } from "sequelize";
import database from "../../libs/connection";

export function resultToData(resultData) {
  return {
    id: resultData?.id || "",
    isAdmin: resultData.roles && resultData.roles.length && resultData.roles[0].name === "Admin" ? true : false,
    isProfessional: resultData.subscription && resultData.subscription.type === "professional" ? true : false,
    avatar: resultData?.profile?.avatar || resultData?.avatar || "",
    name: resultData?.profile?.name || resultData?.name || "",
    email: resultData?.profile?.email || resultData?.email || "",
    phone: resultData?.profile?.phone || resultData?.phone || "",
    zip: resultData?.profile?.zip || resultData?.zip || "",
    address: resultData?.profile?.address || resultData?.address || "",
    number: resultData?.profile?.number || resultData?.number || "",
    complement: resultData?.profile?.complement || resultData?.complement || "",
    neighborhood: resultData?.profile?.neighborhood || resultData?.neighborhood || "",
    city: resultData?.profile?.city || resultData?.city || "",
    state: resultData?.profile?.state || resultData?.state || "",
    subscription: {
      planId: resultData?.subscription?.planId || "",
      type: resultData?.subscription?.type || "",
      reason: resultData?.subscription?.reason || "",
      frequency: resultData?.subscription?.frequency || 0,
      createdAt: resultData.subscription && resultData.subscription.createdAt ? resultData.subscription.createdAt.toString() : "",
    },
  };
}

export async function findOne(id, tenantId) {
  const { Users } = await database();
  const where = { id };
  if (tenantId) where.tenant = tenantId;
  return await Users.findOne({ where, include: ["subscription", "profile", "roles"] });
}

export async function findAll(id, tenantId) {
  const { Users } = await database();
  const where = { id: { [Op.not]: id } };
  if (tenantId) where.tenant = tenantId;
  return await Users.findAll({where, include: ["subscription", "profile", "roles"] });
}
