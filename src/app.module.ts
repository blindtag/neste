import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';

@Module({
  imports: [
    ProductsModule, 
    MongooseModule.forRoot('mongodb+srv://ken123:ken123@cluster0.ughez.mongodb.net/neste?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
