import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { DatabaseModule } from '../database/database.module';
import { IdPipe } from './image.pipe';
import { AuthModule } from '../auth/auth.module';
import { RoleGuard } from '../auth/role.guard';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [ImageController],
    providers: [ImageService, IdPipe, RoleGuard],
})
export class ImageModule {}
