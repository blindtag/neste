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
        const jul = {id:product.id, title:product.title, description:product.description, price: product.price}
        console.log(jul)
        return jul
    }
    async updateProduct(productId:string, title:string, desc:string, price:number){
        const updatedproduct = await this.findProduct(productId)
            updatedproduct.save()
        
    }
    async deleteProduct(productId:string){
        const result = await this.productModel.deleteOne({_id:productId}).exec()
        if(result.n === 0){
            throw new NotFoundException('Could not find Product')
        }
    }
    private async findProduct(id:string): Promise<Product>{
        let product 
        try {
            const product = await this.productModel.findById(id)
        } catch (error) {
            throw new NotFoundException('Could not find product.')
        }
        return product
        
        // const productIndex = this.products.findIndex(prod => prod.id === id)
        // const product = this.products[productIndex]
        // if(!product){
        //     throw new NotFoundException('Could not find product')
        // }
        // return [product, productIndex]
    }
}