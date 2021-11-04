import database from "../../libs/connection";

function userToData(resultData) {
  return {
    id: resultData.id,
    name: resultData?.profile?.name || "",
    avatar: resultData?.profile?.avatar || "",
  };
}

function personToData(resultData) {
  return {
    id: resultData.id,
    name: resultData?.name || "",
    avatar: resultData?.avatar || "",
  };
}

export function resultToData(resultData) {
  return {
    id: resultData.id,
    name: resultData.name,
    email: resultData.email,
    phone: resultData.phone,
    zip: resultData.zip,
    address: resultData.address,
    number: resultData.number,
    complement: resultData.complement,
    neighborhood: resultData.neighborhood,
    city: resultData.city,
    state: resultData.state,
    active: resultData.active,
    managersPlace:
      resultData.managersPlace &&
      resultData.managersPlace.map((m) => userToData(m)),
    employeesPlace:
      resultData.employeesPlace &&
      resultData.employeesPlace.map((u) => userToData(u)),
    clientsPlace:
      resultData.clientsPlace &&
      resultData.clientsPlace.map((p) => personToData(p)),
    supliersPlace:
      resultData.supliersPlace &&
      resultData.supliersPlace.map((p) => personToData(p)),
    contactsPlace:
      resultData.contactsPlace &&
      resultData.contactsPlace.map((p) => personToData(p)),
  };
}

function placesInclude(Profiles) {
  const include = [
    {
      association: "managersPlace",
      attributes: ["id"],
      where: { active: true },
      required: false,
      include: [
        {
          model: Profiles,
          attributes: ["id", "avatar", "name"],
        },
      ],
    },
    {
      association: "employeesPlace",
      attributes: ["id"],
      where: { active: true },
      required: false,
      include: [
        {
          model: Profiles,
          attributes: ["id", "avatar", "name"],
        },
      ],
    },
    {
      association: "clientsPlace",
      attributes: ["id", "avatar", "name"],
    },
    {
      association: "supliersPlace",
      attributes: ["id", "avatar", "name"],
    },
    {
      association: "contactsPlace",
      attributes: ["id", "avatar", "name"],
    },
  ];
  return include;
}

export async function findAll(tenantId) {
  const { Places, Profiles } = await database();
  const include = placesInclude(Profiles);
  const data = await Places.findAll({
    where: { tenantId },
    attributes: ["id", "name", "city", "state", "active"],
    include,
  });
  return data;
}

export async function findOne(id, tenantId) {
  const { Places, Profiles } = await database();
  const include = placesInclude(Profiles);
  const data = await Places.findOne({
    where: { id, tenantId },
    attributes: ["id", "name", "city", "state", "active"],
    include,
  });
  return data;
}
