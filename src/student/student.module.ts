import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Student.name,schema:StudentSchema}]) //for registering schema with the name of student and structure follow of StudentSchema 
    ],
    providers: [StudentService],
    controllers: [StudentController]
})
export class StudentModule {}
