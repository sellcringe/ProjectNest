import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Profile} from "../profile/profile.model";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
      SequelizeModule.forFeature([
          User, Profile
      ])
  ],
  exports:[
      UserService
  ]
})
export class UserModule {}
