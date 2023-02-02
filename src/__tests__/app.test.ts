import nock from "nock";
import * as supertest from 'supertest';

import { app } from '../app';


describe('app test', () => {
  const data = require('../../tests/data.js');

  beforeAll(() => {
    nock.disableNetConnect();
    nock.enableNetConnect(/127.0.0.1/);
  });

  afterAll(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  beforeAll(() => {
  });

  test('it should pass a nocked API call', async () => {
    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query({ lat: 1, lon: 1, appid: 'a43413689d058d0f39a232da61dfd5a8', units: 'imperial' })
      .reply(200, data);

    const response = await supertest.agent(app)
      .get('/')
      .query({ lon: '1', lat: '1' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        condition: 'Clouds',
        temperature: 'hot',
        hasAlerts: true,
      }
    });
    expect(response.body.data.currentAlerts[0]).toHaveProperty('sender_name');
    expect(response.body.data.currentAlerts[0]).toHaveProperty('event');
    expect(response.body.data.currentAlerts[0]).toHaveProperty('start');
    expect(response.body.data.currentAlerts[0]).toHaveProperty('end');
    expect(response.body.data.currentAlerts[0]).toHaveProperty('description');
    expect(response.body.data.currentAlerts[0]).toHaveProperty('tags');
  });

  test('it should handle an error', async () => {
    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query({ lat: 1, lon: 1, appid: 'a43413689d058d0f39a232da61dfd5a8', units: 'imperial' })
      .reply(500, { message: 'an error has occurred' });

    const response = await supertest.agent(app)
      .get('/')
      .query({ lon: '1', lat: '1' });
    await new Promise(resolve => setTimeout(resolve));

    expect(response.statusCode).toBe(500);
    expect(response.body).toMatchObject({
      data: {},
      error: 'Request failed with status code 500'
    });
  });

  test('it should return a 404', async () => {
    const response = await supertest.agent(app)
      .get('/nope');

    expect(response.statusCode).toBe(404);
  });
});