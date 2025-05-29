import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Headmaster, HeadmasterDocument } from '../headmaster/schema/headmaster.schema';
import { Teacher, TeacherDocument } from '../teacher/schema/teacher.schema';
import { Student, StudentDocument } from '../student/schema/student.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Headmaster.name) private headmasterModel: Model<HeadmasterDocument>,
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    // private jwtService: JwtService,
  ) {}

  // Try to find user by email in all collections
private async findUserAndValidatePassword(email: string, password: string) {
  // Try Headmaster
  let user = await this.headmasterModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return { user, userType: 'headmaster' };
  }

  // Try Teacher
  user = await this.teacherModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return { user, userType: 'teacher' };
  }

  // Try Student
  user = await this.studentModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return { user, userType: 'student' };
  }

  // No user found or password mismatch
  return null;
}

  async validateUser(email: string, password: string) {
    const result = await this.findUserAndValidatePassword(email,password);
    if (!result) throw new UnauthorizedException('Invalid credentials');

    const { user, userType } = result;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    return { user, userType };
  }

  async login(email: string, password: string) {
    const { user, userType } = await this.validateUser(email, password);
    const payload = { userName: user.userName, email: user.email, userId: user._id, userType: userType };

    const token = jwt.sign(payload,'abcdefghijklmnopqrstuvwxyz12343#$%#^#&@3',{expiresIn:'1d'});


    return {
      access_token: token,
      userType,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
