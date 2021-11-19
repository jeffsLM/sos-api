import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreatePatientRecordsService from '../services/CreatePatientRecordsService';

const upload = multer(uploadConfig);
const patientRecordsRouter = Router();

patientRecordsRouter.post('/', upload.single('audio'), async (request, response) => {
  try {
    const { body } = request;
    const { key } = request.file as Express.Multer.File;

    const patient = await CreatePatientRecordsService({ key, ...body });

    return response.json(patient);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

export default patientRecordsRouter;
