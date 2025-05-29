import { Module } from '@nestjs/common';
import { HeadmasterController } from './headmaster.controller';
import { HeadmasterService } from './headmaster.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Headmaster, HeadmasterSchema } from './schema/headmaster.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Headmaster.name,schema:HeadmasterSchema}])
  ],
  controllers: [HeadmasterController],
  providers: [HeadmasterService]
})
export class HeadmasterModule {}
