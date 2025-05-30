import { Injectable } from '@nestjs/common';
import { Attendance, AttendanceDocument } from './schema/attendance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AttendanceService {
    constructor(@InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>) { }

    // create attendance for teacher
    async createAttendance(data: Partial<Attendance>):
        // Promise<Student>
        Promise<{ message: string; Attendance: Attendance }> {
        const newAttendance = new this.attendanceModel(data);
        const savedAttendance = await newAttendance.save();
        if (!savedAttendance) throw new Error('Failed to create attendance');
        return {
            message: 'Attendance created successfully',
            Attendance: savedAttendance,
        };
    }

    // create bulk attendance for student
    async createBulkAttendance(data: Partial<Attendance>[]): Promise<{ message: string}> {
        const savedAttendance = await this.attendanceModel.insertMany(data);
        if (!savedAttendance) throw new Error('Failed to create attendance');
        return {
            message: 'Attendance created successfully',
        };
    }

    // get all attendance
    async getAllAttendance(): Promise<Attendance[]> {
        const attendance = await this.attendanceModel.find().exec();
        if (!attendance) throw new Error('Failed to get attendance');
        return attendance;
    }

}
