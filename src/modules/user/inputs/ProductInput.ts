import { Length } from 'class-validator';
import { Field, InputType } from "type-graphql";


@InputType()
export class ProductInput {

    @Field()
    @Length(1, 150)
    name: string;

}