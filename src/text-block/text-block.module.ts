import { Module } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "../profile/profile.model";
import {FilesModule} from "../files/files.module";
import {textBlock} from "./text-block.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [TextBlockService],
  controllers: [TextBlockController],
  imports: [
    SequelizeModule.forFeature([Profile, textBlock]),
    FilesModule,
    AuthModule
  ]
})
export class TextBlockModule {}
