import {
    Controller,
    Get,
    Param,
    UsePipes,
    Header,
    StreamableFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { IdDto } from './dto/image.dto';
import { IdPipe } from './image.pipe';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get('/')
    @Header('Content-Type', 'image/jpeg')
    @Header('Content-Disposition', 'inline')
    async getImages(): Promise<any> {
        return new StreamableFile(await this.imageService.getImages());
    }

    @Get(':id')
    @UsePipes(IdPipe)
    @Header('Content-Type', 'image/jpeg')
    @Header('Content-Disposition', 'inline')
    async reqGetImage(@Param('id') id: IdDto): Promise<any> {
        return new StreamableFile(await this.imageService.getImageById(id));
    }
}
