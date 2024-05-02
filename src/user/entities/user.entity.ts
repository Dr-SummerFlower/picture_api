import {
    BeforeCreate,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../enums/user-role.enum';

@Table({
    tableName: 'user',
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    password: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
    })
    role: UserRole;

    @BeforeCreate
    static async setPassword(instance: User): Promise<void> {
        const salt: string = await bcrypt.genSalt(10);
        instance.password = await bcrypt.hash(instance.password, salt);
    }
}
