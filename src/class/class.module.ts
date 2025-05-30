import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Class,ClassSchema } from './schema/class.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Class.name,schema:ClassSchema}]),
    AuthModule
  ],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
