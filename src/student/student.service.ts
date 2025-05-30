import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Student, StudentDocument } from './schema/student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ) { }

    // for create student
    async createStudent(data: Partial<Student>):// Promise<Student>
        Promise<{ message: string; student: Student }> {
        try {
            if (data.password) data.password = await bcrypt.hash(data.password, 10);
            if (data.name) data.name = data.name.toUpperCase();
            const newStudent = new this.studentModel(data); //just create and object
            const savedStudent = await newStudent.save(); //save your object in the student schema database
            if (!savedStudent) throw new Error('Failed to create student');
            return {
                message: 'Student created successfully',
                student: savedStudent,
            };
        } catch (error) {
            throw new Error(error);
        }
    }
    // get all students
    async getAllStudent(): Promise<Student[]> {
        const student = await this.studentModel.find().exec();
        if (!student) throw new Error('Failed to get student');
        return student;
    }

    // get all student which is match with the class
    async getStudentByClassId(id: string): Promise<Student[]> {
        const student = await this.studentModel.find({ classId: id }).exec();
        if (!student) throw new Error('Failed to get student');
        return student;
    }
}
