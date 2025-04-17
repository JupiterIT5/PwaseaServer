import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CategoryDTO, ProductDTO, ProductFilterDTO, ReviewDTO, VersionDTO } from './dto/product.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Get request

  // @Get("/get-all-products")
  // @HttpCode(200)
  // getAllProduct() {
  //   return this.productService.getAllProduct()
  // }

  @Get("/get-product/:id")
  @HttpCode(200)
  getProduct(@Param("id") id:string) {
    if (isNaN(parseInt(id))) {
      return new NotFoundException("Product id is Number, not string")
    }
    return this.productService.getProduct(parseInt(id))
  }

  @Get("/get-all-category")
  @ApiTags("Category")
  @HttpCode(200)
  getAllCategory() {
    return this.productService.getAllCategory()
  }

  @Get("/get-category/:id")
  @ApiTags("Category")
  @HttpCode(200)
  getCategory(@Param("id") id: string) {
    if (isNaN(parseInt(id))) {
      return new NotFoundException("Category id is Number, not string")
    }
    return this.productService.getCategory(parseInt(id))
  }

  @Get("/get-version/:id")
  @ApiTags("Version")
  @HttpCode(200)
  getVersion(@Param("id") id: string) {
    if (isNaN(parseInt(id))) {
      return new NotFoundException("Product id is Number, not string")
    }
    return this.productService.getVersion(Number(id))
  }

  // Post request

  @Post("/get-product-filter")
  @HttpCode(200)
  @ApiBody({type: ProductFilterDTO})
  async getProductFilter(@Body() dto: ProductFilterDTO) {
    return await this.productService.getProductFilter(dto)
  }

  @Post("/create-product")
  @ApiBody({type: [ProductDTO]})
  async createProduct(@Body() dto: ProductDTO) {
    if (dto.age > 60 || dto.age < 0) {
      return new BadRequestException("The parameter 'Age' does not meet the requirements")
    }
    return await this.productService.createProduct(dto)
  }

  @Post("/create-category")
  @ApiTags("Category")
  @ApiBody({type: [CategoryDTO]})
  async createCategory(@Body() dto: CategoryDTO) {
    return await this.productService.createCategory(dto)
  }

  @Post("/create-review") 
  @ApiBody({type: [ReviewDTO]})
  @ApiTags("Review")
  async createReview(@Body() dto: ReviewDTO) {
    if (dto.review > 5 || dto.review < 1) {
      return new BadRequestException("The review is rated from 1 to 5")
    } 
    return await this.productService.createReview(dto)
  }

  @Post("/create-version-product")
  @ApiTags("Version")
  @ApiBody({type: VersionDTO})
  async createVersion(@Body() dto: VersionDTO) {
    return await this.productService.createVersion(dto)
  }

  // Delete request

  @Post("/delete-product/:id")
  async deleteProduct(@Param("id") id: string) {
    if (isNaN(Number(id))) {
      return new NotFoundException("Product id is Number, not string")
    }
    return await this.productService.deleteProduct(Number(id))
  }

  @ApiTags("Review")
  @Post("/delete-review/:id")
  async deleteReview(@Param("id") id: string) {
    if (isNaN(Number(id))) {
      return new NotFoundException("Review id is Number, not string")
    }
    return await this.productService.deleteReview(Number(id))
  }

  @ApiTags("Version")
  @Post("/delete-version/:id")
  async deleteVersion(@Param("id") id: string) {
    if (isNaN(Number(id))) {
      return new NotFoundException("Version id is Number, not string")
    }
    return await this.productService.deleteVersion(Number(id))
  }

  @ApiTags("Category")
  @Post("/delete-category/:id")
  async deleteCategory(@Param("id") id: string) {
    if (isNaN(Number(id))) {
      return new NotFoundException("Category id is Number, not string")
    }
    return await this.productService.deleteCategory(Number(id))
  }
}
