import faker from "faker";
import { DateTime } from "luxon";
import * as emailService from "../send-email";
faker.locale = "pt_BR";

jest.mock("aws-sdk", () => {
  const SESMocked = {
    sendEmail: jest.fn().mockReturnThis(),
    promise: jest.fn(() => Promise.reject({ message: "test fail" })),
  };
  return {
    SES: jest.fn(() => SESMocked),
  };
});

describe("Auth API - Send Email", () => {
  it("Should pass", async () => {
    const dt = DateTime.now();
    const expiryDate = dt.plus({ hours: 1 });
    const forgotPasswordParams = {
      email: faker.internet.email(),
      date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss"),
      code: +Math.random().toString().substring(2, 6),
      codeUrl: faker.datatype.uuid(),
    };
    const res = await emailService.sendEmail(forgotPasswordParams);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("test fail");
  });
});
