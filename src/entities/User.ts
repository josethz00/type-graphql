import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType, Root } from 'type-graphql';


@ObjectType() //to tell graphql that is a type do be returned
@Entity()
export class User extends BaseEntity {

    @Field(() => ID) //this decoprator tells what fields can be pulled from the user, or exposed to the user
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column('text', { unique: true })
    email: string;

    @Field() //only graphql field
    name (@Root() parent: User) : string {
        return `Hello ${parent.firstName} ${parent.lastName}`;
    }

    @Column()
    password: string;

    @Column('bool', { default: false })
    confirmed: boolean;

}