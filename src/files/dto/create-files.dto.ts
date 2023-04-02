import {IsNumber} from "class-validator";

export class CreateFilesDto {


    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;




}