import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { UserPipe } from './user.pipe';
import { JwtService } from '@nestjs/jwt';
import { RoleGuard } from '../auth/role.guard';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, JwtService, UserPipe, RoleGuard],
    exports: [UserService],
})
export class UserModule {}
