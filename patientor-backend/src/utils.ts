/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, NewPatient } from './types';
import { FinnishSSN } from 'finnish-ssn';

const isString = (text: any): text is string => {
  return typeof text == 'string' || text instanceof String;
};

const parseString = (keyToParse: string, stringToParse: any): string => {
  if (!stringToParse || !isString(stringToParse)) {
    throw new Error(
      `Incorrect or missing ${keyToParse} must be a string: ${
        stringToParse as string
      }`
    );
  }

  return stringToParse;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date as string}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender as string}`);
  }
  return gender;
};

const parseAnValidateSSN = (object: any): FinnishSSN => {
  const { valid, sex, dateOfBirth } = FinnishSSN.parse(object.ssn);

  // Convert Timestamp to YYYY-MM-DD
  const SSNDateOfBirth = new Date(dateOfBirth).toISOString().split('T')[0];

  if (
    !object.ssn ||
    !isString(object.ssn) ||
    !isDate(object.dateOfBirth) ||
    // Check if SSN is valid
    !valid ||
    // Check if SSN gender matches given
    sex !== object.gender ||
    // Check if SSN date of birth matches given
    SSNDateOfBirth !== object.dateOfBirth
  ) {
    throw new Error(
      `Incorrect, missing or not matching SSN: ${object.ssn as string}`
    );
  }

  return object.ssn as string;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString('name', object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseAnValidateSSN(object),
    gender: parseGender(object.gender),
    occupation: parseString('occupaction', object.occupation),
  };
};

export default toNewPatient;
