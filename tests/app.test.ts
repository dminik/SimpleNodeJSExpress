import request from 'supertest';
import app from '../src/app';

describe('Calculator API', () => {
  test('should return 3 for adding 1 and 2', async () => {
    const res = await request(app).get('/api/calculate?num1=1&num2=2&operation=add');
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBe(3);
  });

  test('should return 2 for subtracting 3 from 5', async () => {
    const res = await request(app).get('/api/calculate?num1=5&num2=3&operation=subtract');
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBe(2);
  });

  test('should return 6 for multiplying 2 and 3', async () => {
    const res = await request(app).get('/api/calculate?num1=2&num2=3&operation=multiply');
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBe(6);
  });

  test('should return 5 for dividing 10 by 2', async () => {
    const res = await request(app).get('/api/calculate?num1=10&num2=2&operation=divide');
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBe(5);
  });

  test('should return error for division by zero', async () => {
    const res = await request(app).get('/api/calculate?num1=10&num2=0&operation=divide');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Cannot divide by zero');
  });

  test('should return error for invalid operation', async () => {
    const res = await request(app).get('/api/calculate?num1=10&num2=2&operation=invalid');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Invalid operation');
  });

  test('should return error for missing parameters', async () => {
    const res = await request(app).get('/api/calculate?num1=10');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Missing parameters');
  });
});
