import { IsInt } from 'class-validator';

export class IdDto {
    @IsInt({ message: 'id 必须为数字并且是整数' })
    id: number;
}
