import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { Homework } from './schema/homework.schema';

@Controller('homework')
export class HomeworkController {
    constructor(private readonly homeworkService:HomeworkService){}
    // create homework
    @UseGuards(AuthGuard)
    @Post()
    async createHomework(@Body() data:Partial<Homework>):Promise<{message:string;homework:Homework}>{
        return await this.homeworkService.createHomework(data);
    }
    // get all homework
    @UseGuards(AuthGuard)
    @Get('all')
    async getAllHomework():Promise<Homework[]>{
        return await this.homeworkService.getAllHomework();
    }
    // get homework by id 
    @UseGuards(AuthGuard)
    @Get(':id')
    async getHomeworkById(@Body() id:string):Promise<Homework | null>{
        return await this.homeworkService.getHomeworkById(id);
    }
    // get many homework which is match in the class 
    @UseGuards(AuthGuard)
    @Get('class/:id')
    async getHomeworkByClassId(@Body() id:string):Promise<Homework[]>{
        return await this.homeworkService.getHomeworkByClassId(id);
    }
}

