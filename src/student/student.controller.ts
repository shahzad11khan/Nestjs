import { Body, Controller, Post, UseGuards,Req } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './schema/student.schema';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService:StudentService){}
    @UseGuards(AuthGuard)
    @Post()
    async addStudent(@Body() data:Partial<Student>,@Req() req:Request){
          const teacherId = req['user'].userId;
          data.teacherId=teacherId;
          const teacherName = req['user'].userName;
          data.teacher=teacherName;
        return this.studentService.createStudent(data);
    }
}
