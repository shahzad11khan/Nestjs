import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Homework, HomeworkDocument } from './schema/homework.schema';
import { Model } from 'mongoose';

@Injectable()
export class HomeworkService {
    constructor(@InjectModel(Homework.name)private readonly homeworkModel:Model<HomeworkDocument>){}

    // create homework
    async createHomework(data:Partial<Homework>):Promise<{message:string;homework:Homework}>{
        const homework = await this.homeworkModel.create(data);
        if(!homework) throw new Error('Failed to create homework');
        return {message:'Homework created successfully',homework};
    }
    // get All homework
    async getAllHomework():Promise<Homework[]>{
        const homework = await this.homeworkModel.find().exec();
        if(!homework) throw new Error('Failed to get homework');
        return homework;
    }
    // get homework by id
    async getHomeworkById(id:string):Promise<Homework | null>{
        const homework = await this.homeworkModel.findById(id).exec();
        if(!homework) throw new Error('Failed to get homework');
        return homework;
    }
    // get homework by class id
    async getHomeworkByClassId(id:string):Promise<Homework[]>{
        const homework = await this.homeworkModel.find({classId:id}).exec();
        if(!homework) throw new Error('Failed to get homework');
        return homework;
    }
}
