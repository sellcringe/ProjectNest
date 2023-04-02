import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateProfileDto} from "../profile/dto/Create-profile.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";

@ApiTags(`Авторизация`)
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }
    @Post('/login')
    login(@Body() userDto: CreateProfileDto){
        return this.authService.login(userDto)
    }
    @Post('/registration')
    registration(@Body() profileDto: CreateProfileDto){
        return this.authService.registration(profileDto)

    }
}
