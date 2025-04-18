import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'
import { CategoryDTO, ProductDTO, ProductFilterDTO, ReviewDTO, VersionDTO } from './dto/product.dto'

@Injectable()
export class ProductService {
	constructor (private readonly prisma: PrismaService){}

	// Get request

	getAllProduct() {
		return this.prisma.product.findMany()
	}

	getProduct(id: number) {
		return this.prisma.product.findUnique({
			where: {
				id
			},
			include: {
				version: true,
				review: true
			}
		})
	}

	getAllCategory() {
		return this.prisma.category.findMany()
	}

	getCategory(id: number) {
		return this.prisma.category.findUnique({
			where: {
				id
			}
		})
	}
	
	getVersion(id: number) {
		return this.prisma.version.findMany({
			where: {
				productId: id
			}
		})
	}

	// Post request

	async createProduct(dto: ProductDTO) {
		return await this.prisma.product.create({
			data: dto
		})
	}

	async createCategory(dto: CategoryDTO) {
		return await this.prisma.category.create({
			data: dto
		})
	}

	async createReview(dto: ReviewDTO) {
		return await this.prisma.review.create({
			data: dto
		})
	}

	async createVersion(dto: VersionDTO) {
		return await this.prisma.version.create({
			data: dto
		})
	}

	async getProductFilter(dto: ProductFilterDTO) {
		let product;
		if (dto.categoryId) {
			await this.prisma.product.findMany({where: {categoryId: dto.categoryId}}).then((value) => product = value)
		} else {
			await this.prisma.product.findMany().then((value) => product = value)
		}
		if (product) {
			if (dto.searchText) {
				product = product.filter((value) => value.name.includes(dto.searchText))
			}
			if (!dto.offset && !dto.limit && !dto.age && !dto.rating) {
				return product
			}
			if (dto.offset && dto.limit) {
				product = product.slice(dto.limit*(dto.offset - 1),dto.limit*dto.offset)
			}
			if (dto.age) {
				product = product.filter((value) => value.age === dto.age)
			}		
			if (dto.rating) {
				product = product.filter((value) => dto.rating && value.rating >= dto.rating )
			}
		}
		return product
	}

	// Delete request

	async deleteProduct(id: number) {
		return await this.prisma.product.delete({
			where: {
				id
			}
		})
	}

	async deleteReview(id: number) {
		return await this.prisma.review.delete({
			where: {
				id
			}
		})
	}

	async deleteVersion(id: number) {
		return await this.prisma.version.delete({
			where: {
				id
			}
		})
	}

	async deleteCategory(id: number) {
		return await this.prisma.category.delete({
			where: {
				id
			}
		})
	}
}
