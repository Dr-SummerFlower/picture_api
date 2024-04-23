import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { CommonFilter } from './common/common.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalFilters(new CommonFilter());
    app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
    app.setBaseViewsDir(join(__dirname, '..', 'public', 'views'));
    app.setViewEngine('express-art-template');

    await app.listen(3100);
}

bootstrap();
