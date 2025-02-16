import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBody({
    type: RegisterDTO,
    description: 'User register.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered a new user.',
  })
  @ApiResponse({
    status: 409,
    description: 'Failed to register, email has been used.',
  })
  async register(@Body() registerDTO: RegisterDTO) {
    return await this.usersService.create(registerDTO);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
