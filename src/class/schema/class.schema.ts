import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ClassDocument = Class & Document;
@Schema({timestamps:true})
export class Class {
    @Prop({required:true})
    name:string

    @Prop({required:true})
    teacherId:string
}

export const ClassSchema = SchemaFactory.createForClass(Class);