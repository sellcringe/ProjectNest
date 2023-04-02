import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {

    }
    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.roleService.createRole(dto)

    }
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        if(!value){
            throw new HttpException("Такой роли нет", HttpStatus.NOT_FOUND)
        }
        return this.roleService.getRolByValue(value)

    }
}
