import { Body, Controller, Post, UseGuards,Req, Get } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './schema/student.schema';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService:StudentService){}
    // for create student
    @UseGuards(AuthGuard)
    @Post()
    async addStudent(@Body() data:Partial<Student>,@Req() req:Request){
          const teacherId = req['user'].userId;
          const teacherName = req['user'].userName;
          const classId = req['user'].classId;
          const className = req['user'].className;
          data.class=className;
          data.classId=classId;
          data.teacherId=teacherId;
          data.teacher=teacherName;
        return this.studentService.createStudent(data);
    }
    // get all student
    @UseGuards(AuthGuard)
    @Get('all')
    async getAllStudent(@Req() req:Request):Promise<Student[]>{
        return await this.studentService.getAllStudent();
    }
}
