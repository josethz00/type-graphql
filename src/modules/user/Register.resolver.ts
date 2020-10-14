import { Resolver, Query, Mutation, Arg, FieldResolver, Root, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entities/User';
import { isAuth } from '../../middlewares/isAuth';
import { RegisterInput } from './inputs/RegisterInput';
import { sendMail } from '../../utils/sendMail';
import { createConfirmationUrl } from '../../utils/createConfirmationUrl';


@Resolver(User)
export class RegisterResolver {

    @Query(() => String, { nullable: false })
    @UseMiddleware(isAuth)
    async hello () {
        return 'Hello World';
    }

    @FieldResolver()
    async name (@Root() parent: User) {
        return `Hello ${parent.firstName} ${parent.lastName}`;
    }

    @Mutation(() => User, { nullable: false }) 
    async Register (
        @Arg('data') { firstName, lastName, email, password }: RegisterInput ,
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        await sendMail(email, await createConfirmationUrl(user.id))

        return user;
    }

}