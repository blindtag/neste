import { Controller, Post, Body, Get, Param, Patch  } from '@nestjs/common'
import { StringDecoder } from 'string_decoder';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController{
    constructor(private readonly productsService: ProductsService){

    }
    @Post()
    addProduct(
    @Body('title') prodTitle:string, 
    @Body('description') prodDesc:string,
    @Body('price') prodPrice: number 
    ){
       const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
       return {id: generatedId}
    }
    @Get()
    getAllProducts(){
        return this.productsService.getProducts()
    }
    @Get(':id')
    getProduct(@Param('id') productId:string){
        return this.productsService.getProduct(productId)
    }
    @Patch(':id')
    updateProduct(
    @Param('id') productId:string,
    @Body('title') prodTitle:string,
    @Body('description') prodDesc:string,
    @Body('price') prodPrice:number
    ){
        return this.productsService.updateProduct(productId, prodTitle,  prodDesc, prodPrice)
    }
} 