import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class GetUserDTO {
		@ApiProperty()
		@IsString()
		login: string;

		@ApiProperty()
		@IsString()
		password: string;
}

export class UserDTO {
	@ApiProperty({required: false})
	@IsString()
	email?: string;

	@ApiProperty({required: false})
	@IsString()
	phone?: string;

	@ApiProperty()
	@IsString()
	login: string;

	@ApiProperty()
	@IsString()
	password: string;

	@ApiProperty({required: false})
	@IsBoolean()
	face?: boolean

	@ApiProperty({required: false})
	@IsBoolean()
	avatar?: string;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty({required: false})
	@IsString()
	nameCompany?: string;
}

export class UpdateUserDTO {
	@ApiProperty({required: false})
	@IsString()
	email?: string;

	@ApiProperty({required: false})
	@IsString()
	phone?: string;

	@ApiProperty({required: false})
	@IsString()
	login?: string;

	@ApiProperty({required: false})
	@IsString()
	password?: string;

	@ApiProperty({required: false})
	@IsBoolean()
	face?: boolean

	@ApiProperty({required: false})
	@IsString()
	name?: string;

	@ApiProperty({required: false})
	@IsString()
	nameCompany?: string;

	@ApiProperty({required: false})
	@IsBoolean()
	avatar?: string;
}