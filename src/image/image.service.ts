import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { IdDto } from './dto/image.dto';

@Injectable()
export class ImageService {
    constructor(
        @Inject('SEQUELIZE')
        private readonly sequelize: Sequelize,
    ) {}

    async getImage(id: IdDto): Promise<Buffer> {
        const image: any = await this.sequelize.models.Image.findOne({
            where: {
                id,
            },
        });
        if (image.dataValues.image) {
            return image.dataValues.image;
        } else {
            throw new HttpException('图片未找到', HttpStatus.NOT_FOUND);
        }
    }
}
