import { registerAs } from '@nestjs/config';

export default registerAs('firebase', () => ({
  projectId: process.env.FIREBASE_PROJECT_ID,
  emulatorHost: process.env.FIRESTORE_EMULATOR_HOST,
  nodeEnv: process.env.NODE_ENV,
}));
