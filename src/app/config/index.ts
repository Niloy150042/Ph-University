import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join((process.cwd(),'.env')) });

export default {
  port: process.env.PORT,
 database_uri:process.env.DATABASE_URI,
  bycrypt_salt_rounds:process.env.BYCRYPT_SALT_ROUND,
  default_pass:process.env.DEFAULT_PASS
};
