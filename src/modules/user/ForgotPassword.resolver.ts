import { User } from '../../entities/User';
import { redis } from '../../redis';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { sendMail } from '../../utils/sendMail';
import { v4 } from 'uuid';
import { forgotPasswordPrefix } from '../../constants/redisPrefixes';


@Resolver()
export class ForgotPasswordResolver {
    
    @Mutation(() => Boolean, { nullable: false }) 
    async forgotPassword (
        @Arg('email') email: string
    ): Promise<boolean> {

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return true; //the  user can't know if the email is or not in the database
        }

        const token = v4();
        await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60*60*24);
        const url = `http://localhost:3000/user/change-password/${token}`;

        await sendMail(email, url)

        return true;

    }

}