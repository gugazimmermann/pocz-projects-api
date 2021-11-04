import database from "../../libs/connection";

export function resultToData(resultData) {
  return {
    id: resultData.id,
    name: resultData.name,
    site: resultData.site,
    email: resultData.email,
    phone: resultData.phone,
    zip: resultData.zip,
    address: resultData.address,
    number: resultData.number,
    complement: resultData.complement,
    neighborhood: resultData.neighborhood,
    city: resultData.city,
    state: resultData.state,
    comments: resultData.comments,
    contacts: resultData.contacts,
  };
}

export async function findAll(tenantId) {
  const { Companies } = await database();
  const data = await Companies.findAll({ where: { tenantId } });
  return data;
}

export async function findOne(id, tenantId) {
  const { Companies, Persons } = await database();
  const data = await Companies.findOne({ where: { id, tenantId } });
  if (!data)
    return CreateResponse(404, { message: "Registro não encontrado!" });
  const contacts = await Persons.findAll({ where: { companyId: data.id } });
  data.contacts = [];
  contacts.forEach((c) =>
    data.contacts.push({ id: c.id, name: c.name, position: c.position })
  );
  return data;
}
