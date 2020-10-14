import { User } from '../../entities/User';
import { Resolver } from 'type-graphql';
import { RegisterInput } from './inputs/RegisterInput';
import { CreateBaseResolver } from '../abstracts/CreateBaseResolver';


const BaseCreateUser = CreateBaseResolver('User', User, RegisterInput, User);


@Resolver()
export class CreateUserResolver extends BaseCreateUser{


}