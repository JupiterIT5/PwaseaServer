import { Controller, Param, Post, Get, Body, HttpCode, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDTO, UpdateUserDTO, UserDTO } from './dto/user.dto'
import { ApiBody } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

    // get request

    @Get("/get-all-users")
    @HttpCode(200)
    getAllUsers() {
      return this.userService.getAllUsers()
    }

    @Get("/get-user")
    @HttpCode(200)
    @ApiBody({type: GetUserDTO})
    getUser(@Body() dto: GetUserDTO) {
      return this.userService.getUser(dto)
    }

    // post request

    @Post("/create-user")
    @HttpCode(201)
    @ApiBody({type: UserDTO})
    async createUser(@Body() dto: UserDTO) {
      return await this.userService.createUser(dto)
    }

    // put request 

    @Post("/update-user/:id")
    @HttpCode(200)
    @ApiBody({type: UpdateUserDTO})
    async updateUser(@Body() dto: UpdateUserDTO, @Param("id") id: string) {
      if (isNaN(Number(id))) {
        return new NotFoundException("User id is Number, not string")
      }
      return await this.userService.updateUser(dto, Number(id))
    }

    // delete request

    @Post("/delete-user/:login")
    @HttpCode(200)
    async deleteUser(@Param("login") login: string) {
      return await this.userService.deleteUser(login)
    }
}
