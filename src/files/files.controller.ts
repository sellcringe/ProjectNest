import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FilesService} from "./files.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {RoleGuard} from "../auth/role.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {Profile} from "../profile/profile.model";
import {ApiResponse} from "@nestjs/swagger";
import {CreateFilesDto} from "./dto/create-files.dto";


@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {}
    // @ApiResponse({status: 200, type: [Profile]})
    // @Roles("USER")

    @Post()
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    @UseInterceptors(FileInterceptor('image'))
    createImage( //
               @UploadedFile() image) {
        return this.filesService.CreateImagePost(image)
    }



}
