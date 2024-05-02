import { Sequelize } from 'sequelize-typescript';
import { join } from 'node:path';
import { Image } from '../image/entities/image.entity';
import { User } from '../user/entities/user.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize: Sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: join(__dirname, '..', '..', 'DB', 'api.sqlite'),
                logging: false,
                models: [Image, User],
            });
            await sequelize.sync();
            return sequelize;
        },
    },
];
