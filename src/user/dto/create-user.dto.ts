import { IsString, MinLength, MaxLength, IsEmail, IsIn } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string;

    @IsString()
    @IsIn([UserRole.ADMIN, UserRole.USER, UserRole.GUEST])
    role: UserRole;
}
