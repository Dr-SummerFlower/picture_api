import { Test } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { databaseProviders } from './database.providers';

describe('Sequelize 实例', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [...databaseProviders],
        }).compile();

        sequelize = moduleRef.get<Sequelize>('SEQUELIZE');
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('应该创建 Sequelize 实例', () => {
        expect(sequelize).toBeDefined();
    });
});
