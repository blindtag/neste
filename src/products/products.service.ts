import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {Product} from './product.model'

@Injectable()
export class ProductsService{
    private products: Product[] = []
   
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    insertProduct(title:string, desc:string, price:number){
        const newProduct = new this.productModel({title, description:desc, price})
         newProduct.save()
        return newProduct
    }
    getProducts(){
        return [...this.products]
    }
    getProduct(productId:string){
       const product = this.findProduct(productId)
        return {...product} 
    }
    updateProduct(productId:string, title:string, desc:string, price:number){
        const [product, index] =this.findProduct(productId)

        const updatedProduct = {...product}
        if(title){
            updatedProduct.title =title
        }
        if(desc){
            updatedProduct.description = desc
        }
        if(price){
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct
    }
    deleteProduct(productId:string){
        const index =this.findProduct(productId)[1]
        this.products.splice(index, 1)
        
    }
    private findProduct(id:string):[Product, number]{
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const product = this.products[productIndex]
        if(!product){
            throw new NotFoundException('Could not find product')
        }
        return [product, productIndex]
    }
}