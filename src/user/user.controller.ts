import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Patch,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UserPipe } from './user.pipe';
import { UserRole } from './enums/user-role.enum';
import { Role } from '../auth/role.decorator';
import { RoleGuard } from '../auth/role.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(UserPipe)
    create(@Body() createUserDto: CreateUserDto): Promise<string> {
        return this.userService.create(createUserDto);
    }

    @Role(UserRole.ADMIN, UserRole.USER)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Role(UserRole.ADMIN, UserRole.USER)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(+id);
    }

    @Role(UserRole.ADMIN, UserRole.USER)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Patch(':id')
    @UsePipes(UserPipe)
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.userService.update(+id, updateUserDto);
    }

    @Role(UserRole.ADMIN, UserRole.USER)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(+id);
    }

    @Post('login')
    async login(
        @Body() userInfo: { email: string; password: string },
    ): Promise<{ access_token: string }> {
        return this.userService.login(userInfo.email, userInfo.password);
    }
}
