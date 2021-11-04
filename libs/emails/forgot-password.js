import aws from "aws-sdk";
import CreateResponse from "../response";

const ses = new aws.SES({ region: "us-east-1" });

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
    return await ses
      .sendEmail({
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: { Data: message },
          },
          Subject: { Data: subject },
        },
        Source: "no-reply@iustitia.io",
      })
      .promise();
  } catch (err) {
    return CreateResponse(500, { message: err.message });
  }
}

export default sendForgotPasswordEmail;