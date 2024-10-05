import { calculate } from '../src/calculator';

describe('Calculator Logic', () => {
  test('should return 3 for adding 1 and 2', () => {
    expect(calculate(1, 2, 'add')).toBe(3);
  });

  test('should return 2 for subtracting 3 from 5', () => {
    expect(calculate(5, 3, 'subtract')).toBe(2);
  });

  test('should return 6 for multiplying 2 and 3', () => {
    expect(calculate(2, 3, 'multiply')).toBe(6);
  });

  test('should return 5 for dividing 10 by 2', () => {
    expect(calculate(10, 2, 'divide')).toBe(5);
  });

  test('should throw error for division by zero', () => {
    expect(() => calculate(10, 0, 'divide')).toThrow('Cannot divide by zero');
  });

  test('should throw error for invalid operation', () => {
    expect(() => calculate(10, 2, 'invalid')).toThrow('Invalid operation');
  });
});
