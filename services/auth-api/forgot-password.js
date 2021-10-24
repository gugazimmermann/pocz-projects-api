import aws from "aws-sdk";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import { validateEmail } from "../../libs/utils";

async function sendEmail({ email, date, code, codeUrl }) {
  var ses = new aws.SES({ region: "us-east-1" });
  const getTime = (date) => {
    const separate = date.split(" ")[1].split(":");
    return `${separate[0]}:${separate[1]}`;
  };
  const getDate = (date) => date.split(" ")[0];
  const URL = `${process.env.PROJECT_APP_URL}/esqueceu-senha`;
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

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (!body.email || !validateEmail(body.email)) {
    return CreateResponse(400, { message: "Dados inválidos!" });
  }
  try {
    const { Users, ForgotPassword } = await database();
    const user = await Users.findOne({ where: { email: body.email } });
    if (!user) {
      return CreateResponse(404, { message: "Usuário não encontrado!" });
    }
    if (!user.active) {
      return CreateResponse(401, { message: "Cadastro Inativo!" });
    }
    const dt = DateTime.now();
    const expiryDate = dt.plus({ hours: 1 });
    const forgotPasswordParams = {
      email: body.email,
      date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss"),
      code: +Math.random().toString().substring(2, 6),
      codeUrl: uuidv4(),
    };
    await ForgotPassword.create({
      email: forgotPasswordParams.email,
      code: forgotPasswordParams.code,
      codeurl: forgotPasswordParams.codeUrl,
      expiryDate: expiryDate.toJSDate(),
    });
    await sendEmail(forgotPasswordParams);
    return CreateResponse(200, {
      body: {
        email: forgotPasswordParams.email,
        date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss"),
      },
    });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, err.message);
  }
};
