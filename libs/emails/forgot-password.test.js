import { sesClient } from "./libs/sesClient";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { sendForgotPasswordEmail } from './forgot-password';

const expiryDate = DateTime.now().plus({ hours: 1 });
const forgotPasswordParams = {
  email: "test@test.com",
  date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss"),
  code: +Math.random().toString().substring(2, 6),
  codeUrl: uuidv4(),
};

describe("Emails - Send Forgot Password Email", () => {

  test("Should call send", async () => {
    const mock = jest.spyOn(sesClient, 'send').mockResolvedValueOnce({ isMock: true });
    const res = await sendForgotPasswordEmail(forgotPasswordParams);
    expect(res.isMock).toBe(true);
    mock.mockRestore();
  });

  test("Should return client error", async () => {
    const mock = jest.spyOn(sesClient, 'send').mockRejectedValueOnce(new Error("CLIENT ERROR!"));
    const res = await sendForgotPasswordEmail(forgotPasswordParams);
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("CLIENT ERROR!");
    mock.mockRestore();
  });
});
