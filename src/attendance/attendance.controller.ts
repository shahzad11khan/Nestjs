import { Controller, Req, Body, Post, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './schema/attendance.schema';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }
  // create attendance for teacher
  @UseGuards(AuthGuard)
  @Post()
  async addAttendance(@Body() data: Partial<Attendance>, @Req() req: Request) {
    const Id = req['user'].userId;
    const Name = req['user'].userName;
    const classId = req['user'].classId;
    const className = req['user'].className;
    data.className = className;
    data.classId = classId;
    data.userId = Id;
    data.userName = Name;
    return await this.attendanceService.createAttendance(data);
  }

  // create bulk attendance for student
  @UseGuards(AuthGuard)
  @Post('allStudentAttendance')
  async addBulkAttendance(@Body() data: Partial<Attendance>[], @Req() req: Request) {
    const Id = req['user'].userId;
    const Name = req['user'].userName;
    const classId = req['user'].classId;
    const className = req['user'].className;
    data.map((item) => (item.markedById = Id, item.markedBy = Name, item.className = className, item.classId = classId));
    return await this.attendanceService.createBulkAttendance(data);
  }

  // get all attendance
  @UseGuards(AuthGuard)
  @Post('allAttendance')
  async getAllAttendance(@Req() req: Request): Promise<Attendance[]> {
    return await this.attendanceService.getAllAttendance();
  }
}
