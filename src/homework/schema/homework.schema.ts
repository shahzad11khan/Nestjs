import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type HomeworkDocument = Homework & Document;
@Schema({ timestamps: true })
export class Homework {
    @Prop({required:true})
    title:string
    @Prop({required:true})
    description:string
    @Prop({required:true})
    className:string
    @Prop({required:true})
    classId:string
    @Prop({required:true})
    teacherId:string
    @Prop({required:true})
    teacherName:string
    @Prop({required:true})
    date:Date
    @Prop({required:true})
    lastDate:Date
    @Prop({required:true})
    subject:string
    @Prop({required:true})
    subjectId:string
}
export const HomeworkSchema = SchemaFactory.createForClass(Homework); 