import { Injectable } from "@nestjs/common"
import {Product} from './product.model'

@Injectable()
export class ProductsService{
    products: Product[] = []
    inserProduct(title:string, desc:string, price:number){
        const newProduct = new Product(new Date().toString(), title, desc, price)
        this.products.push(newProduct)
    }
}