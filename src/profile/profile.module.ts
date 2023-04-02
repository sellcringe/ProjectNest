import {forwardRef, Module} from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([Profile, Role, UserRoles]),
      RolesModule,
      UserModule

  ],
  exports:[
      ProfileService
  ]
})
export class ProfileModule {}
