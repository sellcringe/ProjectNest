import {IsEmail, IsNumber, IsString, Length} from "class-validator";

export class CreateProfileDto{

    @IsString({message: 'Должно быть строковым'})
    @IsEmail({},{message: "Некорректынй email"})
    readonly email : string;

    @IsString({message: 'Должно быть строковым'})
    readonly password : string;

    @IsString({message: 'Должно быть строковым'})
    readonly firstName : string;

    @IsString({message: 'Должно быть строковым'})
    readonly lastName : string;

    @IsNumber({}, {message: "Должно быть числом"})
    // @Length(9, 15, {message: 'От 9 до 15 номер'})
    readonly phoneNumber : number;

    @IsString({message: 'Должно быть строковым'})
    readonly gender : string;

}