import { Product } from "../../entities/Product";
import { Resolver } from "type-graphql";
import { CreateBaseResolver } from "../abstracts/CreateBaseResolver";
import { ProductInput } from "../user/inputs/ProductInput";

const BaseCreateProduct = CreateBaseResolver('Product', Product, ProductInput, Product);


@Resolver()
export class CreateUserProduct extends BaseCreateProduct{


}