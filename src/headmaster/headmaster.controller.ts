import { Body, Controller, Get, Post } from '@nestjs/common';
import { HeadmasterService } from './headmaster.service';
import { Headmaster } from './schema/headmaster.schema';

@Controller('headmaster')
export class HeadmasterController {
    constructor(private readonly headmasterService:HeadmasterService){}
    // for create headmaster
    @Post()
    async addHeadmaster(@Body() data:Partial<Headmaster>){ 
        return await this.headmasterService.createHeadmaster(data);
    }
    // get all headmaster
    @Get('all')
    async getAllHeadmaster(){ 
        return await this.headmasterService.getAllHeadmaster();
    }
}
