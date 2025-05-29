import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TeacherDocument = Teacher & Document;

@Schema({ timestamps: true })
export class Teacher {
    @Prop({ required: true })
    userName: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true })
    cnic: string;
    @Prop({ required: true })
    HeadmasterId: string;
    @Prop({ required: true })
    phoneNumber: string;
    @Prop()
    address?: string;
    @Prop()
    bankName?: string;
    @Prop()
    accountNumber?: string;
    @Prop()
    salary: string;
    @Prop()
    status: string;
    @Prop()
    image?: string;    
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);