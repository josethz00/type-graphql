import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from "type-graphql";
import { IsUnique } from './IsEmailUnique';


@InputType()
export class RegisterInput {

    @Field()
    @Length(1, 150)
    firstName: string;

    @Field()
    @Length(1, 150)
    lastName : string;

    @Field()
    @IsEmail()
    @IsUnique({ message: 'This e-mail is already registered!' })
    @Length(1, 100)
    email : string;

    @Field()
    @Length(5, 150)
    password : string;

}