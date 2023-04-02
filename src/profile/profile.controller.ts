import {
    Body,
    Controller,
    Delete,
    Get, HttpException, HttpStatus,
    Param, ParseIntPipe,
    Patch,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {ProfileService} from "./profile.service";

import {CreateProfileDto} from "./dto/Create-profile.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

import {Profile} from "./profile.model";
import {RoleGuard} from "../auth/role.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {CreateTextDto} from "../text-block/dto/create-text.dto";

@Controller('profile')
export class ProfileController {
    constructor( private profileService: ProfileService) {}
    // @UsePipes(ValidationPipe)//import из nest@... а не из директрии

    // @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: [Profile]})
    @Post()
    async create(@Body() userDto: CreateProfileDto) {

        return await this.profileService.createProfile(userDto);
    }
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @Get('/all')
    async getAllProfiles(userDto: CreateProfileDto){
        return  await this.profileService.getAllProfiles(userDto)

    }
    @Get('/:id')
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    async getById(@Param('id') userId: number
            ){
        return await this.profileService.getById(userId)
    }

    @Put('/:id')
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    async update (@Param('id', ParseIntPipe) id: number ,
            @Body() dto: CreateProfileDto){
        const profile =  await this.profileService.update(dto, id);

        return profile


    }

    @Delete("/:id")
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    delete(@Param('id') id : number){// не удалется из за зависимостей
        return this.profileService.delete(id);

    }
}
