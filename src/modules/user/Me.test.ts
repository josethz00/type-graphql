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

const meQuery = `
{
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Me", () => {
  it("get user", async () => {

        const user = await User.create({
            firstName: "bob",
            lastName: "bob2",
            email: "bobo@bob.com",
            password: "123456bob"
        }).save();

        const response = await gqlCall({
            source: meQuery,
            userId: user.id
        })
        expect(response).toMatchObject({
        data: {
            me: {
                id: `${user.id}`,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        }
        });
    });
    it('should return null', async () => {
        const response = await gqlCall({
            source: meQuery
        });
        expect(response).toMatchObject({
            data: {
                me: null
            }
        })
    });


});