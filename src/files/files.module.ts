import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Files} from "./files.model";
import {Profile} from "../profile/profile.model";

import {ProfileModule} from "../profile/profile.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [FilesService],

  exports:[
      FilesService
  ],
  controllers: [FilesController],
  imports: [
      AuthModule,
      SequelizeModule.forFeature([Files, Profile]),
      ProfileModule
  ]
})
export class FilesModule {}
