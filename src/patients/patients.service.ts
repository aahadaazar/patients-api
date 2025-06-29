import { Injectable, NotFoundException } from '@nestjs/common';
import { FileDbService } from '../common/utils/file-db';
import { Patient } from './interfaces/patient.interface';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly fileDbService: FileDbService) {}

  /**
   * Generates a new unique integer ID for a patient.
   * In a real DB, this would be handled by the DB itself (e.g., auto-increment).
   */
  private async generateNextId(): Promise<number> {
    const patients = await this.fileDbService.readPatients<Patient>();
    if (patients.length === 0) {
      return 1;
    }
    const maxId = Math.max(...patients.map((p) => p.id));
    return maxId + 1;
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patients = await this.fileDbService.readPatients<Patient>();
    const newId = await this.generateNextId();

    const newPatient: Patient = {
      id: newId,
      ...createPatientDto,
    };

    patients.push(newPatient);
    await this.fileDbService.writePatients(patients);
    return newPatient;
  }

  /**
   * Retrieves a paginated list of patients.
   * @param paginationDto Pagination parameters (page, limit).
   * @returns An object containing the paginated list of patients, total count, and total pages.
   */
  async findAll(paginationDto: PaginationDto): Promise<{
    data: Patient[];
    total: number;
    pages: number;
  }> {
    try {
      const patients = await this.fileDbService.readPatients<Patient>();
      const { limit, skip } = paginationDto;

      // Apply pagination logic
      const paginatedPatients = patients.slice(skip, skip + limit);
      const totalPatients = patients.length;
      const totalPages = Math.ceil(totalPatients / limit);

      return {
        data: paginatedPatients,
        total: totalPatients,
        pages: totalPages,
      };
    } catch {
      throw new NotFoundException(`Could not fetch patients`);
    }
  }

  async findOne(id: number): Promise<Patient> {
    const patients = await this.fileDbService.readPatients<Patient>();
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found.`);
    }
    return patient;
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const patients = await this.fileDbService.readPatients<Patient>();
    const patientIndex = patients.findIndex((p) => p.id === id);

    if (patientIndex === -1) {
      throw new NotFoundException(`Patient with ID ${id} not found.`);
    }

    const updatedPatient: Patient = {
      ...patients[patientIndex],
      ...updatePatientDto,
      id: id,
    };
    patients[patientIndex] = updatedPatient;

    await this.fileDbService.writePatients(patients);
    return updatedPatient;
  }

  async remove(id: number): Promise<void> {
    const patients = await this.fileDbService.readPatients<Patient>();
    const initialLength = patients.length;
    const filteredPatients = patients.filter((p) => p.id !== id);

    if (filteredPatients.length === initialLength) {
      throw new NotFoundException(`Patient with ID ${id} not found.`);
    }

    await this.fileDbService.writePatients(filteredPatients);
  }
}
