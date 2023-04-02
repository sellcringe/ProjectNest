import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {Profile} from "../profile/profile.model";

interface FileCreationAttrs {
    image: string;

}

@Table({tableName: 'files', timestamps: true})
export class Files extends Model<Files, FileCreationAttrs  >{

    @Column({type: DataType.INTEGER , unique: true,autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false}) //unique: true,
        //в видео было но у меня вылетает валид ошибка при изменение 1-2 сымволов при post, убрал

    image: string;


    @Column({type: DataType.STRING,}) //unique: true,
    essenceTable : string;

    @Column({type: DataType.INTEGER})
    essenceId: number;

    // @Column({type: DataType.})

    @ForeignKey(() => Profile) //Указываем на какую модель внешний ключ ссылается
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => Profile) //один ко многим
    author: Profile

}