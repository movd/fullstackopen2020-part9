// 9.13: Patientor backend, step6
// Set up safe parsing, validation and type guards to the POST /api/patients request.
// Refactor the Gender field to use an enum type.
import { FinnishSSN } from 'finnish-ssn';
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: FinnishSSN;
  gender: string;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
