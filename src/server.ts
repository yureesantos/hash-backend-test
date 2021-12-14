/* eslint-disable import/first */
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

import app from './app';
import logger from './logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`🌏 Express server started at http://localhost:${PORT}`);
});
