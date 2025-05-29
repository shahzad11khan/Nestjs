import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './schema/attendance.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Attendance.name,schema:AttendanceSchema}]),
    AuthModule
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule {}
