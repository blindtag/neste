import { Controller, Post, Body, Get, Param, Patch, Delete  } from '@nestjs/common'
import { StringDecoder } from 'string_decoder';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController{
    constructor(private readonly productsService: ProductsService){}
    
    @Post()
    async addProduct(
    @Body('title') prodTitle:string, 
    @Body('description') prodDesc:string,
    @Body('price') prodPrice: number 
    ){
       const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
       return {id: generatedId}
    }
    
    @Get()
    async getAllProducts(){
        return await this.productsService.getProducts()
    }

    @Get(':id')
    async getProduct(@Param('id') productId:string){
        return await this.productsService.getProduct(productId)
    }

    @Patch(':id')
    async updateProduct(
    @Param('id') productId:string,
    @Body('title') prodTitle:string,
    @Body('description') prodDesc:string,
    @Body('price') prodPrice:number
    ){
        return await this.productsService.updateProduct(productId, prodTitle,  prodDesc, prodPrice)
    }
    @Delete(':id')
    async deleteProduct(@Param('id') productId:string){
        await this.productsService.deleteProduct(productId)
        return null
    }
} 