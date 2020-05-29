import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (weight && height) {
    const result = calculateBmi(weight, height);
    res.status(200).json({ weight, height, bmi: `${result}` });
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

// Typing res.body
// Reference: https://stackoverflow.com/a/55413670

interface Exercises {
  daily_exercises: Array<number>;
  target: number;
}

interface CustomRequest<T> extends Request {
  body: T;
}

app.post('/exercises', (req: CustomRequest<Exercises>, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (!(daily_exercises instanceof Array) || !(typeof target === 'number')) {
    console.log(
      'is daily_exercises an array?',
      daily_exercises instanceof Array
    );
    console.log('is target a number?', typeof target === 'number');
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  // calculateExercises(daily_exercises, target);

  res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
