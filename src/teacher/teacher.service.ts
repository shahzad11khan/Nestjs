import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Teacher, TeacherDocument } from './schema/teacher.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {
    constructor(@InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>) { }
    // for create teacher
    // async createTeacher(data:Partial<Teacher>):Promise<{message:string;teacher:Teacher}>{
    //     try {
    //           if(data.password)data.password = await bcrypt.hash(data.password, 10);
    //           if(data.userName) data.userName = data.userName.toUpperCase();

    //         const newTeacher = new this.teacherModel(data);
    //         const savedTeacher = await newTeacher.save();
    //         if(!savedTeacher) throw new Error('Failed to create teacher');
    //         return {message:'Teacher created successfully',teacher:savedTeacher};        
    //     } catch (error) {
    //             throw new Error(error);
    //     }
    // }

    async createTeacher(data: Partial<Teacher>): Promise<{ message: string; teacher: Teacher }> {
        try {

                const existingTeacher = await this.teacherModel.findOne({ cnic: data.cnic });
                if (existingTeacher) {
                    throw new Error('A teacher with the same CNIC already exists.');
                }
            // Check if classId is valid
            if (data.classId && data.section) {
                // Check if another teacher is already assigned to this classId + section
                const existingAssignment = await this.teacherModel.findOne({
                    classId: data.classId,
                    section: data.section
                });

                if (existingAssignment) {
                    throw new Error('This class and section are already assigned to another teacher.');
                }
            }

            if (data.password) data.password = await bcrypt.hash(data.password, 10);
            if (data.userName) data.userName = data.userName.toUpperCase();
            const newTeacher = new this.teacherModel(data);
            const savedTeacher = await newTeacher.save();

            if (!savedTeacher) throw new Error('Failed to create teacher');

            return { message: 'Teacher created successfully', teacher: savedTeacher };

        } catch (error: any) {
            throw new Error(error.message || 'An error occurred while creating the teacher');
        }
    }

    // get all teacher
    async getAllTeacher(): Promise<Teacher[]> {
        const teacher = await this.teacherModel.find().exec();
        if (!teacher) throw new Error('Failed to get teacher');
        return teacher;
    }

    // get teacher by id
    async getTeacherById(id: string): Promise<Teacher | null> {
        try {
            const teacher = await this.teacherModel.findById(id).exec();
            if (!teacher) throw new Error('Failed to get teacher');
            return teacher;
        } catch (error) {
            throw new Error(error);
        }
    }
    // update teacher by id
    async updateTeacherById(id: string, data: Partial<Teacher>): Promise<{ message: string; teacher: Teacher | null }> {
        try {
            const updateTeacher = await this.teacherModel.findByIdAndUpdate(id, data, { new: true }).exec();
            if (!updateTeacher) throw new Error('Failed to update teacher');
            return { message: 'Teacher updated successfully', teacher: updateTeacher };
        } catch (error) {
            throw new Error(error)
        }

    }
}
