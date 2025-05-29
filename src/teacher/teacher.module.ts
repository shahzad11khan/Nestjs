import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';  // <-- import AuthModule
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schema/teacher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Teacher.name,schema:TeacherSchema}]),
    AuthModule
  ],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
