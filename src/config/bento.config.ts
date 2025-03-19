import { registerAs } from '@nestjs/config';

export default registerAs('bento', () => ({
  apiToken: process.env.BENTO_API_TOKEN,
  apiUrl: process.env.BENTO_API_URL,
}));
