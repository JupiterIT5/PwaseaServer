import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaService } from 'prisma/prisma.service'
import { ProductController } from './product/product.controller'
import { ProductService } from './product/product.service'
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule,ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/images',
  }), UserModule,],
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class AppModule {}
