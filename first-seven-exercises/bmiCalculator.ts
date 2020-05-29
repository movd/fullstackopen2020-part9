interface ParsedValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): ParsedValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

type Result = string;

export const calculateBmi = (weight: number, height: number): Result => {
  type bmi = number;

  const bmi = weight / Math.pow(height / 100, 2);
  // console.log(bmi);
  switch (true) {
    // case 18.5 > bmi && bmi < 25:
    case bmi < 15:
      return 'Very severely underweight';
    case bmi >= 15 && bmi < 16:
      return 'Severely underweight';
    case bmi >= 16 && bmi < 18.5:
      return 'Underweight';
    case bmi >= 18.5 && bmi < 25:
      return 'Normal (healthy weight)';
    case bmi >= 25 && bmi < 30:
      return 'Overweight';
    case bmi >= 30 && bmi < 35:
      return 'bese Class I (Moderately obese)';
    case bmi >= 35 && bmi < 40:
      return 'Obese Class II (Severely obese)';
    case bmi >= 40:
      return 'Obese Class III (Very severely obese)';
    default:
      return 'N/A';
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(weight, height));
} catch (error) {
  console.log('Error, something bad happened, message: ', error.message);
}
