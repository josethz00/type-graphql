import { UserContext } from "../@types/UserContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<UserContext> = async ({ context }, next) => {

    if (!context.req.session!.userId) {
        throw new Error('Unauthorized');
    }
    return next();

}