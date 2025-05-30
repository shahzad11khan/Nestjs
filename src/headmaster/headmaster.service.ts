import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Headmaster, HeadmasterDocument } from './schema/headmaster.schema';
import { Model } from 'mongoose';

@Injectable()
export class HeadmasterService {
    constructor(@InjectModel(Headmaster.name)private headmasterModel:Model<HeadmasterDocument>){}
// for create headmaster
    async createHeadmaster(data:Partial<Headmaster>):Promise<{message:string;headmaster:Headmaster}>{
        try {
            if(data.password) data.password = await bcrypt.hash(data.password,10);
            if(data.userName) data.userName = data.userName.toUpperCase();
            const newHeadmaster = new this.headmasterModel(data);
            const savedHeadmaster = await newHeadmaster.save();
            if(!savedHeadmaster) throw new Error('Failed to create headmaster');
            return {message:'Headmaster created successfully',headmaster:savedHeadmaster};
        } catch (error) {
             throw new Error(error);
        }
    }
// get all headmaster
    async getAllHeadmaster():Promise<Headmaster[]>{
        const headmaster = await this.headmasterModel.find().exec();
        if(!headmaster) throw new Error('Failed to get headmaster');
        return headmaster;
    }
}
