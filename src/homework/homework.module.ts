import { Module } from '@nestjs/common';
import { HomeworkController } from './homework.controller';
import { HomeworkService } from './homework.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Homework, HomeworkSchema } from './schema/homework.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Homework.name,schema:HomeworkSchema}]),
    AuthModule
  ],
  controllers: [HomeworkController],
  providers: [HomeworkService]
})
export class HomeworkModule {}
