import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from 'type-graphql';


@ObjectType() //to tell graphql that is a type do be returned
@Entity()
export class Product extends BaseEntity {

    @Field(() => ID) //this decoprator tells what fields can be pulled from the user, or exposed to the user
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

}