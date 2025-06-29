import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class FileDbService {
  private readonly dataPath = path.resolve(__dirname, '../../../data');
  private patientsFilePath: string;
  private usersFilePath: string;

  constructor() {
    this.patientsFilePath = path.join(this.dataPath, 'patients.json');
    this.usersFilePath = path.join(this.dataPath, 'users.json');
  }

  private async readData<T>(filename: 'patients' | 'users'): Promise<T[]> {
    const filePath =
      filename === 'patients' ? this.patientsFilePath : this.usersFilePath;
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data) as T[];
    } catch (error) {
      console.error(`Error reading ${filename}.json:`, error);
      // If file is empty or corrupted, return an empty array to prevent app crash
      return [];
    }
  }

  /**
   * Writes data to a specified JSON file.
   * @param filename 'patients' or 'users'
   * @param data The array of data to write.
   */
  private async writeData<T>(
    filename: 'patients' | 'users',
    data: T[],
  ): Promise<void> {
    const filePath =
      filename === 'patients' ? this.patientsFilePath : this.usersFilePath;
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error writing to ${filename}.json:`, error);
      throw new Error(`Failed to write data to ${filename}.json`);
    }
  }

  // --- Public Methods for Specific Data Types ---

  async readPatients<T>(): Promise<T[]> {
    return this.readData<T>('patients');
  }

  async writePatients<T>(patients: T[]): Promise<void> {
    return this.writeData<T>('patients', patients);
  }

  async readUsers<T>(): Promise<T[]> {
    return this.readData<T>('users');
  }

  async writeUsers<T>(users: T[]): Promise<void> {
    return this.writeData<T>('users', users);
  }
}
