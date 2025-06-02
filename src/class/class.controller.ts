import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { Class } from './schema/class.schema';

@Controller('class')
export class ClassController {
    constructor(private readonly classService:ClassService){}
    // create class
    @UseGuards(AuthGuard)
    @Post()
    async createClass(@Body() data:Partial<Class>,@Req() req:Request):Promise<{message:string;class:Class}>{
        const teacherId = req['user'].userId;
        data.teacherId=teacherId;
        return await this.classService.createClass(data);
    }
    // get all class
    @UseGuards(AuthGuard)
    @Get()
    async getAllClass():Promise<Class[]>{
        return await this.classService.getAllClass();
    }
}
