import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from "type-graphql";


@InputType()
export class LoginInput {

    @Field()
    @IsEmail()
    @Length(1, 100)
    email : string;

    @Field()
    @Length(5, 150)
    password : string;

}