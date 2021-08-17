import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { resourceLimits } from "worker_threads"
import {Product} from './product.model'

@Injectable()
export class ProductsService{
    private products: Product[] = []
   
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async insertProduct(title:string, desc:string, price:number){
        const newProduct = new this.productModel({title, description:desc, price})
        const result = await newProduct.save()
        return result.id as string
    }
    async getProducts(){
        const products = await this.productModel.find().exec()
        return products.map((prod)=>({id:prod.id, title:prod.title , description:prod.description, price:prod.price})) as Product[]
    }
    async getProduct(productId:string){
        const product = await this.findProduct(productId)
        return product
    }
    updateProduct(productId:string, title:string, desc:string, price:number){
   
    }
    deleteProduct(productId:string){
        const index =this.findProduct(productId)[1]
        this.products.splice(index, 1)
        
    }
    private async findProduct(id:string): Promise<Product>{
        let product
        try {
            const product = await this.productModel.findById(id)
            
        } catch (error) {
            throw new NotFoundException('Could not find product.')
        }
        if(!product){
            throw new NotFoundException('Could not find product.')
        }
        return{id:product.id, title:product.title, description:product.description, price: product.price}
        // const productIndex = this.products.findIndex(prod => prod.id === id)
        // const product = this.products[productIndex]
        // if(!product){
        //     throw new NotFoundException('Could not find product')
        // }
        // return [product, productIndex]
    }
}