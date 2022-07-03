import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./libs/sesClient";
import CreateResponse from "../response";

export async function sendInviteEmail({ name, email, code, tenantId, user }) {
  const PROJECT_NAME = process.env.PROJECT_NAME;
  const URL = `${process.env.PROJECT_APP_URL}/convite/${tenantId}`;
  const CODE = code.toString().split("").join(" ");
  const subject = `Convite para Partiticar do ${PROJECT_NAME}`;
  const message = `
  <h3><strong>${process.env.PROJECT_NAME}</strong></h3>
  <h4><strong>Convite para Partiticar</strong></h4>
  <p>Ol&aacute;, ${name},<br />Voc&ecirc; foi convidado para partiticar do <strong>${PROJECT_NAME}</strong> por <strong>${user}</strong>.</p>
  <p>Acesse <a href="${URL}">${URL}</a> e coloque o c&oacute;digo abaixo para criar sua nova senha.</p>
  <h3>C&oacute;digo: ${CODE}</h3>
  <p>Ou se preferir acesse <a href="${URL}/${code}">${URL}/${code}</a> e n&atilde;o &eacute; necess&aacute;rio digitar o c&oacute;digo.</p>
  `;
  try {
    return await sesClient.send(new SendEmailCommand({
      Destination: { ToAddresses: [email] },
      Message: { Body: { Html: { Data: message } }, Subject: { Data: subject } },
      Source: process.env.AWS_SES_EMAIL,
    }));
  } catch (err) {
    return CreateResponse(500, { message: err.message });
  }
}
