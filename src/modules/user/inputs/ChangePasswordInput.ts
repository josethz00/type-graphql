import { Length } from 'class-validator';
import { Field, InputType } from "type-graphql";


@InputType()
export class ChangePasswordInput {

    @Field()
    @Length(5, 150)
    token : string;

    @Field()
    @Length(5, 150)
    password : string;

}