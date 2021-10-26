import faker from "faker";
import { DateTime } from "luxon";
import * as emailService from "../send-email";
faker.locale = "pt_BR";

const sendEmailRes = {
  ResponseMetadata: { RequestId: "eda54736" },
  MessageId: "0000000",
};

jest.mock("aws-sdk", () => {
  const SESMocked = {
    sendEmail: jest.fn().mockReturnThis(),
    promise: jest.fn(() =>
      Promise.resolve(sendEmailRes)
    ),
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
    expect(res).toBe(sendEmailRes);
  });
});
