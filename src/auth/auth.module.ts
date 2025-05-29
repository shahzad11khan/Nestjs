import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Headmaster, HeadmasterSchema } from '../headmaster/schema/headmaster.schema';
import { Teacher, TeacherSchema } from '../teacher/schema/teacher.schema';
import { Student, StudentSchema } from '../student/schema/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Headmaster.name, schema: HeadmasterSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],  // <-- Export JwtModule here!
  
})
export class AuthModule {}
