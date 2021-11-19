import database from '../database';
import PatientRecords from '../models/Ticket';

interface Request {
  patient_id: number;
  key: string;
}

async function CreatePatientRecordsService({
  patient_id,
  key,
}: Request): Promise<PatientRecords> {
  const patient = await database.one<PatientRecords>(
    'INSERT INTO PATIENT_RECORDS VALUES(DEFAULT, $[patient_id], $[key], NOW()) RETURNING *',
    {
      patient_id,
      key,
    },
  );

  return patient;
}

export default CreatePatientRecordsService;
