import {IsNumber} from "class-validator";
export class AddFileDto{


    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;

}




