import request from 'supertest';
import app from '../index';

describe('Image processing endpoint', () => {
  it('returns 400 if params missing', async () => {
    const res = await request(app).get('/api/process');
    expect(res.status).toBe(400);
  });

  it('processes image and returns 200', async () => {
    const res = await request(app).get(
      '/api/process?filename=icelandwaterfall&width=200&height=200'
    );
    expect(res.status).toBe(200);
  });

  it('caches image (second request is faster)', async () => {
    const t1 = Date.now();
    await request(app).get('/api/process?filename=fjord&width=200&height=200');
    const firstTime = Date.now() - t1;

    const t2 = Date.now();
    await request(app).get('/api/process?filename=fjord&width=200&height=200');
    const secondTime = Date.now() - t2;

    expect(secondTime).toBeLessThan(firstTime);
  });
});
