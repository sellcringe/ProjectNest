import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {textBlock} from "./text-block.model";
import {CreateTextDto} from "./dto/create-text.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class TextBlockService {
    constructor(@InjectModel(textBlock) private textRepository : typeof textBlock,
                private fileService: FilesService) {}

    async create(textDto: CreateTextDto, image: any){
        const fileName = await this.fileService.createFile(image);
        const text = await this.textRepository.create({...textDto, image: 'localhost:7000/' + fileName})
        return {fileName, text}

    }
    async getTextByUniqueName(uniqueTitle: string){
        const text = await this.textRepository.findOne({where: {uniqueTitle}})
        return text
    }

    async getTextByGroup(group : string){
        const text = await this.textRepository.findAll({where: {group: group}})
        console.log(text)
        return text
    }

    // async delete()
    async update(dto: CreateTextDto){
        const textBlock = await this.textRepository.update(dto, {where: {uniqueTitle: dto.uniqueTitle}})
        console.log(textBlock)
        return textBlock
    }
}
