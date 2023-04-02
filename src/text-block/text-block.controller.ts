import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param, ParseIntPipe,
    Post, Put,
    UploadedFile, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";

import {TextBlockService} from "./text-block.service";
import {CreateTextDto} from "./dto/create-text.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RoleGuard} from "../auth/role.guard";
import {CreateProfileDto} from "../profile/dto/Create-profile.dto";
import {text} from "express";

@Controller('text-block')
export class TextBlockController {
    constructor(private textService: TextBlockService) {
    }
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreateTextDto, //
               @UploadedFile() image) {
        return this.textService.create(dto, image)
    }
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @Get('/:Group/:UniqueTitle')
    getByUniqueTitle(@Param('UniqueTitle') UniqueTitle: string) {
        if(!UniqueTitle){
            throw new HttpException("Такого поста нет", HttpStatus.NOT_FOUND)
        }
        return this.textService.getTextByUniqueName(UniqueTitle)

    }
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @Get('/:Group')
    getByGroup(@Param('Group') Group: string){
        // if(!textDto.group){
        //     throw new HttpException('Нет такой группы', HttpStatus.NOT_FOUND)
        // }
        return this.textService.getTextByGroup(Group )
    }
    @Put('/:Group/:UniqueTitle')
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    async update (@Param('UniqueTitle')
                  @Body() dto: CreateTextDto){
        const textBlock =  await this.textService.update(dto);

        return textBlock


    }

}

