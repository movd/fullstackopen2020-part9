interface ParsedExerciseValues {
  target: number;
  weeklyExercise: Array<number>;
}

// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
const parseExerciseArguments = (args: Array<string>): ParsedExerciseValues => {
  if (args.length < 2) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    // Remove first 3 elems using ES6 spread
    const [, , , ...firstThreeArgsRemoved] = args;
    const weeklyExercise = firstThreeArgsRemoved.map((e) => Number(e));

    return {
      target: Number(args[2]),
      weeklyExercise,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface CalculateExercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  weeklyExercise: Array<number>,
  target: number
): CalculateExercise => {
  const average =
    weeklyExercise.reduce((a, b) => a + b, 0) / weeklyExercise.length;
  let rating = 0;
  let ratingDescription = '';

  rating = 0;
  ratingDescription = '';

  if (average < target * 0.5) {
    rating = 1;
    ratingDescription = 'do more next week';
  }

  if (average >= target * 0.5 && average < target * 0.999999) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  if (average >= target) {
    rating = 3;
    ratingDescription = 'very good keep it going next week';
  }

  return {
    periodLength: weeklyExercise.length,
    trainingDays: weeklyExercise.filter((e) => e !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface Error {
  status: string;
  statusText: string;
  error: { message: string | undefined } | undefined;
}

try {
  const { target, weeklyExercise } = parseExerciseArguments(process.argv);
  // console.log(target, weeklyExercise);
  console.log(calculateExercises(weeklyExercise, target));
} catch (error) {
  // https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
  console.log(
    'Error, something bad happened, message: ',
    (error as Error).message
  );
}
