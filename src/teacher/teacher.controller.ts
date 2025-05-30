import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './schema/teacher.schema';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService:TeacherService){}
    // for create teacher
    @UseGuards(AuthGuard)
    @Post()
    async addTeacher(@Body() data:Partial<Teacher>,@Req() req:Request){
        const HeadmasterId = req['user'].userId;
        data.HeadmasterId=HeadmasterId;
        return await this.teacherService.createTeacher(data);
    }
    // get all teacher
    @UseGuards(AuthGuard)
    @Get('all')
    async getAllTeacher(@Req() req:Request):Promise<Teacher[]>{
        const teacher = await this.teacherService.getAllTeacher();
        return teacher;
    }
}
