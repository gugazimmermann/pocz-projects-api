import CreateResponse from "../../libs/response";
import { findOne, resultToData } from "./utils";

export const employees = async (tenantId, { id }, { employeesList }) => {
  if (!id || !employeesList) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const place = await findOne(id, tenantId);
    if (!place) return CreateResponse(404, { message: "Registro não encontrado!" });
    if (place.employeesPlace) {
      await place.removeEmployeesPlace(place.employeesPlace.map((e) => e.id));
      await place.save();
    }
    await place.addEmployeesPlace(employeesList.map((e) => e.id));
    await place.save();
    const resultData = await findOne(id, tenantId);
    return CreateResponse(200, { body: resultToData(resultData) });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
