import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default {
  url: process.env.DATABASE_URL,
  port: process.env.PORT || 3333,
  storageType: process.env.STORAGE_TYPE
};
