import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { DatabaseModule } from '../database/database.module';
import { IdPipe } from './image.pipe';

@Module({
    imports: [DatabaseModule],
    controllers: [ImageController],
    providers: [ImageService, IdPipe],
    exports: [IdPipe],
})
export class ImageModule {}
