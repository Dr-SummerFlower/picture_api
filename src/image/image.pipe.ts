import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class IdPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<number> {
        const id: number = Number(value);
        const idObj: { id: number } = { id: id };
        const DTO: any = plainToInstance(metadata.metatype, idObj);
        const errors: ValidationError[] = await validate(DTO);
        if (errors.length) {
            throw new HttpException(
                errors[0].constraints,
                HttpStatus.BAD_REQUEST,
            );
        }
        return id;
    }
}
