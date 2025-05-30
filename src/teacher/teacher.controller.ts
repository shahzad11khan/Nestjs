import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './schema/teacher.schema';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }
    // for create teacher
    @UseGuards(AuthGuard)
    @Post()
    async addTeacher(@Body() data: Partial<Teacher>, @Req() req: Request) {
        const HeadmasterId = req['user'].userId;
        data.HeadmasterId = HeadmasterId;
        return await this.teacherService.createTeacher(data);
    }
    // get all teacher
    @UseGuards(AuthGuard)
    @Get('all')
    async getAllTeacher(@Req() req: Request): Promise<Teacher[]> {
        const teacher = await this.teacherService.getAllTeacher();
        return teacher;
    }
    // get teacher by id 
    @UseGuards(AuthGuard)
    @Get(':id')
    async getTeacherById(@Req() req: Request, @Body() id: string): Promise<Teacher | null> {
        return this.teacherService.getTeacherById(id);
    }

    // Update teacher by id
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateTeacherById(@Req() req: Request, @Param('id') id: string, @Body() data: Partial<Teacher>): Promise<{ message: string; teacher: Teacher | null }> {
        return this.teacherService.updateTeacherById(id, data);
    }

}
