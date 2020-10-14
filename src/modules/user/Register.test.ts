import { Connection } from "typeorm";

import { testConn } from "../../tests/testConn";
import { gqlCall } from "../../tests/gqlCall";
import { User } from "../../entities/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  Register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: 'bobiii',
      lastName: 'boboca',
      email: 'bobiii@boboca.com',
      password: '123456'
    };

    const response = await gqlCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        Register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toBe(user.firstName);
  }, 10000);
});