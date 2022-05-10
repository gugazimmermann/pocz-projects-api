import { sesClient } from "./libs/sesClient";
import { sendInviteEmail } from './invite';

const inviteParams = { 
  name: "teste", 
  email: "teste", 
  code: Math.random().toString().substring(2, 8), 
  userId: "teste", 
  tenantId: "teste", 
  user: "teste"
};

describe("Emails - Send Invite Email", () => {

  test("Should call send", async () => {
    const mock = jest.spyOn(sesClient, 'send').mockResolvedValueOnce({ isMock: true });
    const res = await sendInviteEmail(inviteParams);
    expect(res.isMock).toBe(true);
    mock.mockRestore();
  });

  test("Should return client error", async () => {
    const mock = jest.spyOn(sesClient, 'send').mockRejectedValueOnce(new Error("CLIENT ERROR!"));
    const res = await sendInviteEmail(inviteParams);
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("CLIENT ERROR!");
    mock.mockRestore();
  });
});
