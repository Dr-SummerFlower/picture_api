import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Sequelize } from 'sequelize-typescript';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from '../auth/jwt.constants';

@Injectable()
export class UserService {
    constructor(
        @Inject('SEQUELIZE')
        private readonly sequelize: Sequelize,
        private jwtService: JwtService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<string> {
        const user: User = (await this.sequelize.models.User.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            role: createUserDto.role,
        })) as User;

        if (user.id) {
            return '创建成功';
        }
    }

    async findAll(): Promise<User[]> {
        return (await this.sequelize.models.User.findAll()) as User[];
    }

    async findOne(id: number): Promise<User> {
        return (await this.sequelize.models.User.findByPk(id)) as User;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user: User = await this.findOne(id);
        return await user.update(updateUserDto);
    }

    async remove(id: number): Promise<void> {
        const user: User = await this.findOne(id);
        await user.destroy();
    }

    async login(
        email: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user: User = (await this.sequelize.models.User.findOne({
            where: { email },
        })) as User;
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: any = {
            userid: user.id,
            username: user.name,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: jwtConstants.secret,
                expiresIn: jwtConstants.expiresIn,
            }),
        };
    }
}
