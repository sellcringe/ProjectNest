import {HttpException, HttpStatus} from "@nestjs/common";
//наследование класса от HttpException
export class ValidationException extends HttpException{
    constructor(responce) {

        super(responce, HttpStatus.BAD_REQUEST);
        this.message = responce
    }
}