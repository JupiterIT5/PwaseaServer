import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class ProductDTO {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty({required: false})
  @IsInt()
  reviewCount: number;

  @ApiProperty({required: false})
  @IsString()
  img?: string;

  @ApiProperty({required: false})
  @IsString()
  description?: string;

  @ApiProperty()
  @IsInt()
  age: number;

  @ApiProperty()
  @IsArray()
  formPC: string[];

  @ApiProperty()
  @IsArray()
  formPhone: string[];

  @ApiProperty()
  @IsInt()
  categoryId: number;
}

export class CategoryDTO {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty({required: false})
	@IsString()
	link?: string;
}

export class VersionDTO {
	@ApiProperty({required: false})
	@IsNumber()
	version: number;

	@ApiProperty()
	@IsString()
	description: string;

	@ApiProperty()
	@IsInt()
	productId: number;
}

export class ReviewDTO {
  @ApiProperty()
	@IsInt()
  userId: number;

  @ApiProperty()
	@IsInt()
  review: number

	@ApiProperty()
	@IsString()
  reviewText: string;

  @ApiProperty()
	@IsInt()
	productId: number;
}

export class ProductFilterDTO {
  @ApiProperty({required: false})
	@IsInt()
  limit?: number;

  @ApiProperty({required: false})
	@IsInt()
  offset?: number

  @ApiProperty({required: false})
	@IsInt()
  categoryId?: number

  @ApiProperty({required: false})
	@IsInt()
  age?: number

  @ApiProperty({required: false})
	@IsInt()
  rating?: number
}