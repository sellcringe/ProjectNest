import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {ProfileModule} from "../profile/profile.module";
import {FilesModule} from "../files/files.module";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => ProfileModule  ),
      forwardRef(() => UserModule),
      // forwardRef(() => UserService),//что бы избежать вложения друг в друга нуэно forwardRef
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'secret',
        signOptions: {
          expiresIn: '24h'
        }
      })
  ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
