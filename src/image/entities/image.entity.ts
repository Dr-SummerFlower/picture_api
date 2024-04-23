import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'image',
})
export class Image extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.BLOB('long'),
        allowNull: false,
    })
    image: string;
}
