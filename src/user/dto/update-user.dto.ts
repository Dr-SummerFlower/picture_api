import {
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
    IsIn,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password?: string;

    @IsOptional()
    @IsString()
    @IsIn([UserRole.ADMIN, UserRole.USER, UserRole.GUEST])
    role?: UserRole;
}
