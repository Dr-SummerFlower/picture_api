import {
    Controller,
    Get,
    Param,
    UsePipes,
    Header,
    StreamableFile,
    UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { IdDto } from './dto/image.dto';
import { IdPipe } from './image.pipe';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../user/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Role(UserRole.ADMIN, UserRole.USER, UserRole.GUEST)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('/')
    @Header('Content-Type', 'image/jpeg')
    @Header('Content-Disposition', 'inline')
    async getImages(): Promise<any> {
        return new StreamableFile(await this.imageService.getImages());
    }

    @Role(UserRole.ADMIN, UserRole.USER, UserRole.GUEST)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get(':id')
    @UsePipes(IdPipe)
    @Header('Content-Type', 'image/jpeg')
    @Header('Content-Disposition', 'inline')
    async reqGetImage(@Param('id') id: IdDto): Promise<any> {
        return new StreamableFile(await this.imageService.getImageById(id));
    }
}
