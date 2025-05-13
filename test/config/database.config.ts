import { DataSource } from 'typeorm';
import { DadosConf } from '../../src/entities/dadosConf';
import { DadosConfItem } from '../../src/entities/dadosConfItem';

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [DadosConf, DadosConfItem],
  logging: false,
  synchronize: true,
});

export const setupDatabase = async () => {
  if (!testDataSource.isInitialized) {
    await testDataSource.initialize();
  }
};

export const teardownDatabase = async () => {
  if (testDataSource.isInitialized) {
    await testDataSource.destroy();
  }
};
