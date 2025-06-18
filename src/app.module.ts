import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { HeadmasterModule } from './headmaster/headmaster.module';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ClassModule } from './class/class.module';
import { HomeworkModule } from './homework/homework.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.axusi.mongodb.net/nestjs'),
    StudentModule,
    TeacherModule,
    HeadmasterModule,
    AuthModule,
    AttendanceModule,
    ClassModule,
    HomeworkModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
