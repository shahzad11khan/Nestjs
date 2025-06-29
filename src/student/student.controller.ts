import { Body, Controller, Post, UseGuards,Req, Get, Delete, Param } from '@nestjs/common';
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
          console.log(teacherId,teacherName)
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

    // get all student which is match with the class
    @UseGuards(AuthGuard)
    @Get('class')
    async getStudentByClassId(@Req() req:Request):Promise<Student[]>{
        return await this.studentService.getStudentByClassId(req['user'].classId);
    }  

    // delete student by id
       @UseGuards(AuthGuard)
       @Delete(':id')
      async deleteUser(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
      }
}
