import { buildSchema } from "type-graphql";

export const createSchema = async () => 
    await buildSchema({
        resolvers: [`${__dirname}/../modules/**/*resolver.ts`],
        authChecker: ({ context: {req} }) => {
            if (req.session.userId) {
                return true
            }
            return false;
        }
    });