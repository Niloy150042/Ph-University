import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

import { Server } from 'http';
import { createSuperAdmin } from './app/config/db';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    // creating the super-admin in Database after connecting
    createSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`your server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
  // process.on('unhandledRejection', () => {
  //   console.log('process is unhandledrejection ! shutting downn the server');
  //   if (server) {
  //     server.close(() => {
  //       process.exit(1);
  //     });
  //   }
  //   process.exit(1)
  // });
}
main();

process.on('uncaughtException', () => {
  console.log('uncaught exception is detected! shutting downn the server');
  if (server) {
    process.exit(1);
  }
});
