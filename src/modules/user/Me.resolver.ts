import { UserContext } from '../../@types/UserContext';
import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../../entities/User';


@Resolver()
export class MeResolver {

    @Query(() => User, { nullable: true })
    async me (@Ctx() context: UserContext) : Promise<User | null | undefined> {
        if (!context.req.session!.userId) {
            return null;
        }

        return User.findOne(context.req.session!.userId);
    }

}