import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { Class } from './schema/class.schema';

@Controller('class')
export class ClassController {
    constructor(private readonly classService:ClassService){}
    // create class
    @UseGuards(AuthGuard)
    @Post()
    async createClass(@Body() data:Partial<Class>):Promise<{message:string;class:Class}>{
        return await this.classService.createClass(data);
    }
    // get all class
    @UseGuards(AuthGuard)
    @Get()
    async getAllClass():Promise<Class[]>{
        return await this.classService.getAllClass();
    }
}
