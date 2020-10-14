import { Mutation, Resolver, Ctx } from 'type-graphql';
import { UserContext } from '../../@types/UserContext';


@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout (
        @Ctx() context: UserContext
    ): Promise<boolean> 
    {
        return new Promise((resolve, reject) => context.req.session!.destroy((err) => {
                if (err) {
                    return reject(false);
                }
                context.res.clearCookie('userId')
                return resolve(true);
            })
        );
    }
}