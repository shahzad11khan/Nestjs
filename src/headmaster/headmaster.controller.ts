import { Body, Controller, Post } from '@nestjs/common';
import { HeadmasterService } from './headmaster.service';
import { Headmaster } from './schema/headmaster.schema';

@Controller('headmaster')
export class HeadmasterController {
    constructor(private readonly headmasterService:HeadmasterService){}
    @Post()
    async addHeadmaster(@Body() data:Partial<Headmaster>){ 
        return await this.headmasterService.createHeadmaster(data);
    }
}
