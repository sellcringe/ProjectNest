import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';

import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {ProfileService} from "../profile/profile.service";
import {CreateProfileDto} from "../profile/dto/Create-profile.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";


@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService,
                private profileService: ProfileService ) {}

    async login(profileDto: CreateProfileDto){

        const user = await this.validateUser(profileDto)
        return this.generateToken(user)


    }

    async registration(profileDto : CreateProfileDto){
        const candidate = await this.userService.getUserByEmail(profileDto.email);

        if (candidate){
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(profileDto.password, 5);
        const user = await this.profileService.createProfile({...profileDto, password: hashPassword})
        // console.log(await this.profileService.createProfile({...userDto, password: hashPassword}))
        return this.generateToken(user)


    }
    private async generateToken(user){
        //не видит email
        const payload = {email: user.email, id:user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser (profileDto: CreateProfileDto){
        const user = await this.userService.getUserByEmail(profileDto.email);
        const passwordEquals = await bcrypt.compare(profileDto.password, user.password);
        if (user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message:'Некоректный mail или password'})
    }
}
