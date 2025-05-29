import { Controller,Req,Body, Post, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './schema/attendance.schema';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService:AttendanceService){}
    @UseGuards(AuthGuard)
    @Post()
    async addAttendance(@Body() data:Partial<Attendance>,@Req() req:Request){
        const Id = req['user'].userId;
        const Name = req['user'].userName;
        data.userId=Id;
        data.userName=Name;
        return await this.attendanceService.createAttendance(data);
    }
    @UseGuards(AuthGuard)
    @Post('allStudent')
  async addBulkAttendance(@Body() data: Partial<Attendance>[],@Req() req:Request) {
     const Id = req['user'].userId;
    const Name = req['user'].userName;     
    data.map((item) => (item.markedById=Id,item.markedBy= Name));
    return await this.attendanceService.createBulkAttendance(data);
  }
}
