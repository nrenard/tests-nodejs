const request = require('supertest');

const server = require('../../src/server');
const factory = require('../factories');

const truncate = require('../utils/truncate');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to authenticate with valid credentials', async () => {
    const user = await factory.create('User', { password: '123123' });

    const response = await request(server)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to authenticate with invalid credentials', async () => {
    const user = await factory.create('User', { password: '123123' });

    const response = await request(server)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should be return user not found', async () => {
    // const user = await factory.create('User', { password: '123123' });

    const response = await request(server)
      .post('/sessions')
      .send({
        email: '',
        password: '123123',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt  token when authenticated', async () => {
    const user = await factory.create('User', { password: '123123' });

    const response = await request(server)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to acess private routes when autheticated', async () => {
    const user = await factory.create('User');

    const response = await request(server)
      .get('/dashboard')
      .set('Authorization', `Bearer ${await user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to acess private routes when not autheticated', async () => {
    const response = await request(server).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to acess private routes when not autheticated', async () => {
    const response = await request(server)
      .get('/dashboard')
      .set('Authorization', 'Bearer 123123');

    expect(response.status).toBe(401);
  });

  it('should not be able to acess private routes when not autheticated', async () => {
    const response = await request(server)
      .get('/dashboard')
      .set('Authorization', 'a 123123');

    expect(response.status).toBe(401);
  });
});
