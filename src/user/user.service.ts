import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'
import { GetUserDTO, UpdateUserDTO, UserDTO } from './dto/user.dto'
import { ensureDir, remove } from 'fs-extra';
import { join } from 'path'

import * as path from "path"
import * as fs from "fs"
import * as uuid from "uuid"

export enum FileType {
	IMAGE = "image",
	VIDEO = "video",
	AUDIO = "audio",
	PDF = "pdf"
}

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
		try {
			return await this.prisma.user.create({
				data: dto
			})
		}
		catch {
			return new BadRequestException("user already created")
		}
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

	async updateUserAwatar(id: number, file: Express.Multer.File) {
		if (!file.filename) {
			throw new BadRequestException("Image file not found");
		}
		return await this.prisma.user.update({
			where: {
				id
			},
			data: {
				avatar: `http://89.169.0.195:3000/uploads/${file.filename}`
			}
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
