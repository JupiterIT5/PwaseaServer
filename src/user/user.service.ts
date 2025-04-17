import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'
import { GetUserDTO, UpdateUserDTO, UserDTO } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService){}

	// get request

	getAllUsers() {
		return this.prisma.user.findMany()
	}

	// post request

	async getUser(dto: GetUserDTO) {
		const user = await this.prisma.user.findUnique({
			where: {
				login: dto.login
			}
		})
		if (!user) {
			return new NotFoundException("User is not found")
		}
		if (user.password !== dto.password) {
			return new BadRequestException("Auth is denided")
		}
		return user
	}

	async createUser(dto: UserDTO) {
		return await this.prisma.user.create({
			data: dto
		})
	}

	// put request 

	async updateUser(dto: UpdateUserDTO, id: number) {
		return await this.prisma.user.update({
			where: {
				id
			},
			data: dto
		})
	}

	// delete request

	async deleteUser(login: string) {
		return await this.prisma.user.delete({
			where: {
				login
			}
		})
	}
}
