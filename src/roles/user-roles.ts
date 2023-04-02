import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {Role} from "./roles.model";
import {Profile} from "../profile/profile.model";
import {User} from "../user/user.model";


@Table({tableName: 'UserRoles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles >{
    @ApiProperty({example: '1', description: 'Уникальный индификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role) //ссылаемся еа таблицы role and user
    @Column({type: DataType.INTEGER}) //unique: true,



    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER}) //unique: true,
    profileId: number;



}