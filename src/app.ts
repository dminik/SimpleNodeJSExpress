// src/app.ts
import express from 'express';
import { calculate } from './calculator';  // Import logic from the calculator module

const app = express();
const port = 3000;

const validateInput = (req: any): { number1: number, number2: number, operation: string } | null => {
  const { num1, num2, operation } = req.query;

  if (!num1 || !num2 || !operation) {
    return null; // or throw an error
  }

  const number1 = parseFloat(num1 as string);
  const number2 = parseFloat(num2 as string);

  if (isNaN(number1) || isNaN(number2)) {
    return null; // or throw an error
  }

  return { number1, number2, operation };
};

app.get('/api/calculate', (req: any, res: any): any => {
  const inputData = validateInput(req);
  if (!inputData) {
    return res.status(400).send('Invalid input');
  }

  try {
    const result = calculate(inputData.number1, inputData.number2, inputData.operation);
    res.send({ result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Started Calculator API running at http://localhost:${port}`);
  });
}

export default app;