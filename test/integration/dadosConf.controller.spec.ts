import request from 'supertest';
import { setupDatabase, teardownDatabase } from '../config/database.config';
import { GetDadosConfFixtureFake, GetFirstDadosConfFixture, GetFirstDadosConfItemFixture } from '../fixtures/dadosConf.fixture';
import '../config/setup';
import { BASE_URL } from '../config/constantes';

describe('dadosConf API (Integration)', () => {
  
/*     
    beforeAll(async () => {
        await setupDatabase();
    });

    afterAll(async () => {
        await teardownDatabase();
    });
*/

  it('Deve criar um novo dadosConf e dadosConfItem com sucesso', async () => {
    const dadosConf = await GetDadosConfFixtureFake();
    const response = await request(BASE_URL)
      .post('/api/dados-conf')
      .send(dadosConf);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      tipo: dadosConf.tipo,
      itens: expect.any(Array),
    });
  });

  it('Deve retornar um dadosConf pelo ID', async () => {
    const dadosConf = await GetFirstDadosConfFixture();
    const response = await request(BASE_URL)
      .get(`/api/users/${dadosConf!.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: dadosConf!.id,
      tipo: dadosConf!.tipo,
      itens: expect.any(Array),
    });
    
  });


});
