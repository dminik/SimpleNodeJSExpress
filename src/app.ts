import express from 'express';
import { calculate } from './calculator';  // Import logic from the calculator module

const app = express();
const port = 3000;

app.get('/api/calculate', (req: any, res: any): any => {
  const { num1, num2, operation } = req.query;

  // Input validation and parsing
  if (!num1 || !num2 || !operation) {
    return res.status(400).send('Missing parameters');
  }

  const number1 = parseFloat(num1 as string);
  const number2 = parseFloat(num2 as string);

  if (isNaN(number1) || isNaN(number2)) {
    return res.status(400).send('Invalid number inputs');
  }

  try {
    // Call the separated logic for calculation
    const result = calculate(number1, number2, operation as string);
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