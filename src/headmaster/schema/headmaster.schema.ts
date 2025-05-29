import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type HeadmasterDocument = Headmaster & Document;
@Schema({ timestamps: true })
export class Headmaster {
    @Prop({ required: true })
    userName: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true })
    cnic: string;
    @Prop({ required: true })
    phoneNumber: string;  
}

export const HeadmasterSchema = SchemaFactory.createForClass(Headmaster);