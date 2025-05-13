import { setupDatabase, teardownDatabase } from './database.config';

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});
