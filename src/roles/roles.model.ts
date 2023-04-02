import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
// import {User} from "../users/users.model";
import {UserRoles} from "./user-roles";
import {Profile} from "../profile/profile.model";
import {User} from "../user/user.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs >{
    @ApiProperty({example: '1', description: 'Уникальный индификатор'})
    @Column({type: DataType.INTEGER , unique: true,autoIncrement:true, primaryKey: true})
    id: number;
    @ApiProperty({example: 'ADMIN', description: 'Роль пользователя'})
    @Column({type: DataType.STRING, unique: true ,  allowNull: false}) //unique: true,
        //в видео было но у меня вылетает валид ошибка при изменение 1-2 сымволов при post, убрал

    value: string;

    @ApiProperty({example: 'Администратор', description: 'описание роли'})
    @Column({type: DataType.STRING,  allowNull: false, primaryKey: false}) //unique: true,
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

}