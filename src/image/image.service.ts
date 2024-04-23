import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { IdDto } from './dto/image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
    constructor(
        @Inject('SEQUELIZE')
        private readonly sequelize: Sequelize,
    ) {}

    async getImages(): Promise<any> {
        const allImages: Image[] =
            (await this.sequelize.models.Image.findAll()) as Image[];
        const randomIndex: number = Math.floor(
            Math.random() * allImages.length,
        );
        const randomImage: Image = allImages[randomIndex];
        return randomImage.image;
    }

    async getImageById(id: IdDto): Promise<any> {
        const image: any = await this.sequelize.models.Image.findOne({
            where: {
                id,
            },
        });
        return image.image;
    }
}
