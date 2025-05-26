const request = require('supertest');
const app = require('../index');

describe('POST /add-doctor', () => {
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/add-doctor')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.text).toContain('Error: Required fields are missing');
  });
});
