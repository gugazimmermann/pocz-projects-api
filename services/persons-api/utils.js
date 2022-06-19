import database from "../../libs/connection";

export function resultToData(resultData) {
  const onwers = [];
  if (resultData.type === "clients") {
    if (resultData.userClients) resultData.userClients.forEach((u) => onwers.push({ id: u.id, name: u?.profile?.name, type: "person" }));
    if (resultData.placeClients) resultData.placeClients.forEach((p) => onwers.push({ id: p.id, name: p.name, type: "place" }));
  }
  if (resultData.type === "contacts") {
    if (resultData.userContacts) resultData.userContacts.forEach((u) => onwers.push({ id: u.id, name: u?.profile?.name, type: "person" }));
    if (resultData.placeContacts) resultData.placeContacts.forEach((p) => onwers.push({ id: p.id, name: p.name, type: "place" }));
  }
  if (resultData.type === "supliers") {
    if (resultData.userSupliers) resultData.userSupliers.forEach((u) => onwers.push({ id: u.id, name: u?.profile?.name, type: "person" }));
    if (resultData.placeSupliers) resultData.placeSupliers.forEach((p) => onwers.push({ id: p.id, name: p.name, type: "place" }));
  }
  return {
    id: resultData.id,
    type: resultData.type,
    avatar: resultData.avatar,
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
    position: resultData.position,
    companyId: resultData.companyId,
    company: resultData.company?.name,
    comments: resultData.comments,
    onwers: onwers,
  };
}

function personsInclude(Profiles) {
  return [
    { association: "company", attributes: ["name"] },
    { association: "userClients", attributes: ["id"], where: { active: true }, required: false, include: [{ model: Profiles, attributes: ["name"] }] },
    { association: "userSupliers", attributes: ["id"], where: { active: true }, required: false, include: [{ model: Profiles, attributes: ["name"] }] },
    { association: "userContacts", attributes: ["id"], where: { active: true }, required: false, include: [{ model: Profiles, attributes: ["name"] }] },
    { association: "placeClients", attributes: ["id", "name"] },
    { association: "placeSupliers", attributes: ["id", "name"] },
    { association: "placeContacts", attributes: ["id", "name"] },
  ];
}

export async function findAll(type, tenantId) {
  const { Persons, Profiles } = await database();
  const include = personsInclude(Profiles);
  return await Persons.findAll({
    where: { type, tenantId },
    attributes: ["id", "type", "avatar", "name", "phone", "email", "city", "state" ],
    include
  });
}

export async function findOne(id, tenantId) {
  const { Persons, Profiles } = await database();
  const include = personsInclude(Profiles);
  return await Persons.findOne({ where: { id, tenantId }, include });
}
