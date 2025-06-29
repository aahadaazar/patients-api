import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { FileDbService } from 'src/common/utils/file-db';

@Module({
  providers: [PatientsService, FileDbService],
  controllers: [PatientsController],
})
export class PatientsModule {}
