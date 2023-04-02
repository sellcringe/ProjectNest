import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Profile} from "../profile/profile.model";

interface textBlockCreationAttrs {
    uniqueTitle: string;
    title: string;
    content: string;
    image: string;
    group: string;
}

@Table({tableName: 'text-block'})
export class textBlock extends Model<textBlock, textBlockCreationAttrs >{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique:true, allowNull: false})
    uniqueTitle: string

    @Column({type: DataType.STRING, allowNull: false}) //unique: true,
        //в видео было но у меня вылетает валид ошибка при изменение 1-2 сымволов при post, убрал
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    group: string



    @Column({type: DataType.STRING,  allowNull: false})  //unique: true,
    content: string;


    @Column({type: DataType.STRING})
    image: string;



}