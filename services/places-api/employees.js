import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findOne, resultToData } from "./utils";

export const handler = async (event, context) => {
  const { id } = event?.pathParameters;
  const { employees } = JSON.parse(event?.body);
  if (!id || !employees)
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const user = await DecodedId(event);
    const place = await findOne(id, user.tenant);
    if (!place)
      return CreateResponse(404, { message: "Registro não encontrado!" });
    if (place.employeesPlace) {
      const exintingEmployees = place.employeesPlace.map((m) => m.id);
      await place.removeEmployeesPlace(exintingEmployees);
      await place.save();
    }
    const employeesIds = employees.map((m) => m.id);
    await place.addEmployeesPlace(employeesIds);
    await place.save();
    const resultData = await findOne(id, user.tenant);
    return CreateResponse(200, { data: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
