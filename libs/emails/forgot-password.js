import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./libs/sesClient";
import CreateResponse from "../response";

export async function sendForgotPasswordEmail({ email, date, code, codeUrl }) {
  const getTime = (date) => {
    const separate = date.split(" ")[1].split(":");
    return `${separate[0]}:${separate[1]}`;
  };
  const getDate = (date) => date.split(" ")[0];
  const URL = `${process.env.PROJECT_APP_URL}/mudar-senha`;
  const CODE = code.toString().split("").join(" ");
  const subject = "Recuperação de Senha";
  const message = `
  <h3><strong>${process.env.PROJECT_NAME}</strong></h3>
  <h4><strong>Recupera&ccedil;&atilde;o de Senha</strong></h4>
  <p>Por motivos de seguran&ccedil;a n&atilde;o temos acesso as senhas dos usuários, para recuperar sua senha voc&ecirc; necessita criar uma nova.</p>
  <p>Acesse <a href="${URL}">${URL}</a> e coloque o c&oacute;digo abaixo para criar sua nova senha.</p>
  <h4>C&oacute;digo: ${CODE}</h4>
  <p>Ou se preferir acesse <a href="${URL}/${codeUrl}">${URL}/${codeUrl}</a> e n&atilde;o &eacute; necess&aacute;rio digitar o c&oacute;digo.</p>
  <p>Este c&oacute;digo &eacute; v&aacute;lido at&eacute; &agrave;s <strong>${getTime(
    date
  )}</strong> de <strong>${getDate(date)}</strong>.</p>
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
