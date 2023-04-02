import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
// import {User} from "../users/users.model";
import {Role} from "./roles.model";
import {UserRoles} from "./user-roles";
import {Profile} from "../profile/profile.model";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, Profile,UserRoles])
  ],
  exports: [
    RolesService
  ]

})
export class RolesModule {}
