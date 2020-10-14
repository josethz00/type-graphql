import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entities/User';
import { LoginInput } from './inputs/LoginInput';
import { UserContext } from '../../@types/UserContext';


@Resolver()
export class LoginResolver {
    
    @Mutation(() => User, { nullable: true }) 
    async login (
        @Arg('data') { email, password }: LoginInput,
        @Ctx() context: UserContext
    ): Promise<User | string> {

        const user = await User.findOne({ where: { email }});
        if (!user) {
            return 'User or password incorrect';
        }
        const valid = await bcrypt.compare(password!.toString(), user.password);

        if(!valid) {
            return 'User or password incorrect';
        }
        if (!user.confirmed) {
            return 'User or password incorrect';
        }

        context.req.session!.userId = user.id;

        return user;
    }

}