import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'
import { GetUserDTO, UpdateUserDTO, UserDTO } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService){}

	// get request

	getAllUsers() {
		return this.prisma.user.findMany()
	}

	getUser(dto: GetUserDTO) {
		return this.prisma.user.findUnique({
			where: {
				login: dto.login,
				password: dto.password
			}
		})
	}

	// post request

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
