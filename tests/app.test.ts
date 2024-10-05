import request from 'supertest';
import app from '../src/app';
import * as calculator from '../src/calculator';  // Import the calculator module

jest.mock('../src/calculator');

describe('Calculator API', () => {

  beforeEach(() => {
    // Reset mocks before each test to avoid interference between tests
    jest.clearAllMocks();
  });

  test('should return 3 for adding 1 and 2', async () => {
    const mockedCalculate = jest.spyOn(calculator, 'calculate').mockReturnValue(3);

    // Act
    const res = await request(app).get('/api/calculate?num1=1&num2=2&operation=add');

    expect(mockedCalculate).toHaveBeenCalledWith(
      1, // num1
      2, // num2
      'add'); // operation

    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBe(3);
  });

  test('should return error for missing parameters', async () => {
    const mockedCalculate = jest.spyOn(calculator, 'calculate').mockReturnValue(3);

    // Act
    const res = await request(app).get('/api/calculate?num1=10');

    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Invalid input');

    expect(mockedCalculate).toHaveBeenCalledTimes(0); 
  });

  test('should return error for invalid number inputs', async () => {
    const res = await request(app).get('/api/calculate?num1=abc&num2=10&operation=add');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Invalid input');
  });
});
