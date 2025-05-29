import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ enum: ['Teacher', 'Student'] })
  userType: 'Teacher' | 'Student';

  @Prop({})
  userName: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: () => new Date() })
  date: Date;

  @Prop({ default: 'Absent', enum: ['Present', 'Absent', 'Leave'] })
  status: 'Present' | 'Absent' | 'Leave';

  @Prop()
  markedById?: string;
  @Prop()
  markedBy?: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
