import { User } from '../../entities/User';
import { redis } from '../../redis';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { confirmationPrefix } from '../../constants/redisPrefixes';


@Resolver()
export class ConfirmUserResolver { //confirmar se recebeu email
    
    @Mutation(() => Boolean || String, { nullable: false }) 
    async confirmUser (
        @Arg('token') token: string,
    ): Promise<boolean | string> {

        const userId = await redis.get(confirmationPrefix + token)

        if(!userId){
            return false;
        }

        try { 
            await User.update( { id: parseInt(userId, 10) }, { confirmed: true } )
            await redis.del(token);
            return true;
        }
        catch(err){
            return err.message;
        }


    }

}