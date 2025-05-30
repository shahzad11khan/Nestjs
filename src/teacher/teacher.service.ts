import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Teacher, TeacherDocument } from './schema/teacher.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {
    constructor(@InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>){}
    // for create teacher
    async createTeacher(data:Partial<Teacher>):Promise<{message:string;teacher:Teacher}>{
        try {
              if(data.password)data.password = await bcrypt.hash(data.password, 10);
              if(data.userName) data.userName = data.userName.toUpperCase();
            const newTeacher = new this.teacherModel(data);
            const savedTeacher = await newTeacher.save();
            if(!savedTeacher) throw new Error('Failed to create teacher');
            return {message:'Teacher created successfully',teacher:savedTeacher};        
        } catch (error) {
                throw new Error(error);
        }
    }
// get all teacher
    async getAllTeacher():Promise<Teacher[]>{
        const teacher = await this.teacherModel.find().exec();
        if(!teacher) throw new Error('Failed to get teacher');
        return teacher;
    }
}
