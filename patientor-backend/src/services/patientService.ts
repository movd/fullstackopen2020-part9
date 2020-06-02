import { uuid } from 'uuidv4';
import patientData from '../../data/patients.json';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatient = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const patient = getNonSensitivePatient().find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatient,
  findById,
  addPatient,
};
