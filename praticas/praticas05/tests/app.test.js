const request = require('supertest');
const app = require('../app');

describe('API Tarefas', () => {
  test('GET /tarefas retorna status 200', async () => {
    const response = await request(app).get('/tarefas');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  test('GET / retorna mensagem de funcionamento', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('API Prática 05 funcionando!');
  });
});