import request from 'supertest';
import app from '../src/app';

describe('Calculator API', () => {
  test('should return 3 for adding 1 and 2', async () => {
    const res = await request(app).get('/api/calculate?num1=1&num2=2&operation=add');
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBe(3);
  });

  test('should return error for division by zero', async () => {
    const res = await request(app).get('/api/calculate?num1=10&num2=0&operation=divide');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Cannot divide by zero');
  });

  test('should return error for missing parameters', async () => {
    const res = await request(app).get('/api/calculate?num1=10');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Invalid input');
  });

  test('should return error for invalid number inputs', async () => {
    const res = await request(app).get('/api/calculate?num1=abc&num2=10&operation=add');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Invalid input');
  });
});
