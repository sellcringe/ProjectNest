import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
// import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProfileModule } from './profile/profile.module';
import * as path from 'path'
import {Profile} from "./profile/profile.model";
import { TextBlockModule } from './text-block/text-block.module';
import {textBlock} from "./text-block/text-block.model";
import {Files} from "./files/files.model";
import { UserModule } from './user/user.module';
import {User} from "./user/user.model";






@Module({
    controllers:[],
    providers: [],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role,UserRoles,  Profile, textBlock, Files],
            autoLoadModels: true,


        }),
        ProfileModule,
        // UsersModule,
        RolesModule,
        AuthModule,
        FilesModule,
        TextBlockModule,


        //import для работы со статико + import * as path from 'path'
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),


        UserModule,




    ],

})

export class AppModule {}