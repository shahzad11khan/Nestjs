import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type StudentDocument = Student & Document;
@Schema({timestamps:true})
export class Student {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    age: number;
    @Prop({ required: true })
    class: string;
    @Prop({ required: true })
    classId: string;
    @Prop({ required: true })
    teacher: string;
    @Prop({ required: true })
    teacherId: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true })
    confirmPassword: string;
    @Prop({ required: true })
    guardianName: string;
    @Prop({ required: true })
    guardianPhone: string;
    @Prop({ required: true })
    guardianEmail: string;
    @Prop()
    address?: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);