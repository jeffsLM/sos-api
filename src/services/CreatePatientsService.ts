import database from '../database';
import Patient from '../models/Patient';

interface Request {
  patient_name: string;
  user_id: string;
  key: string;
}

async function CreatePatientsService({
  patient_name,
  user_id,
  key,
}: Request): Promise<Patient> {
  const patient = await database.one<Patient>(
    'INSERT INTO PATIENTS VALUES(DEFAULT, $[user_id], $[patient_name], $[key], NOW()) RETURNING *',
    {
      patient_name,
      user_id,
      key,
    },
  );

  return patient;
}

export default CreatePatientsService;
