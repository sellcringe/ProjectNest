import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'; //модуль для работы с путями
import * as fs from 'fs'; //модуль для работы с файлами
import * as uuid from 'uuid';
import {CreateFilesDto} from "./dto/create-files.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Files} from "./files.model";
import {FilesModule} from "./files.module";
import {ProfileService} from "../profile/profile.service";
import {CreateProfileDto} from "../profile/dto/Create-profile.dto";
import {JwtService} from "@nestjs/jwt"; //модуль для рандомных названий
@Injectable()
export class FilesService {
    constructor(@InjectModel(Files) private filesRepository : typeof Files,
                private userService: ProfileService) {}
    async createFile(file): Promise<string>{
        try{
            const fileName = uuid.v4()+ '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')
            // если такого пути нет, создать путь
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;

        }catch (e){
            throw new HttpException('произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)//серверная ошибка
        }

    }

    async CreateImagePost(image: any){

        const fileName = await this.createFile(image);

        const imagePost = await this.filesRepository.create({image: 'localhost:7000/' + fileName})
        return imagePost

        }
    // async reNameFile(file)Promise<string>{
    //     try {
    //
    //     }catch (e){
    //         throw new HttpException('произошла ошибка при изменении  файла', HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }
    // async update(id: number){
    //
    //     return this.filesRepository.update(id, )
    // }


}

