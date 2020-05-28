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
  let rating: number;
  let ratingDescription: string;

  if (average < target * 0.5) {
    rating = 1;
    ratingDescription = "do more next week";
  }

  if (average >= target * 0.5 && average < target * 0.999999) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  if (average >= target) {
    rating = 3;
    ratingDescription = "very good keep it going next week";
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
