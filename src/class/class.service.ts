import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from './schema/class.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClassService {
    constructor(
        @InjectModel(Class.name) private classModel:Model<ClassDocument>
    ) {}

    // create class
    async createClass(data:Partial<Class>):Promise<{message:string;class:Class}>{
        try {
            const newClass = new this.classModel(data);
            const savedClass = await newClass.save();
            if(!savedClass) throw new Error('Failed to create class');
            return {message:'Class created successfully',class:savedClass};
        } catch (error) {
            throw new Error(error);
        }
    }

    // get all class
    async getAllClass():Promise<Class[]>{
        const allClass = await this.classModel.find().exec();
        if(!allClass) throw new Error('Failed to get class');
        return allClass;
    }
}
