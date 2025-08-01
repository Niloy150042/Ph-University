/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user: jwtpayload; // request name er interfae e arekta property add hoise 
    }
  }
}
