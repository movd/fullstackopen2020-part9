type Result = string;

const calculateBmi = (weight: number, height: number): Result => {
  type bmi = number;

  const bmi = weight / Math.pow(height / 100, 2);
  // console.log(bmi);
  switch (true) {
    // case 18.5 > bmi && bmi < 25:
    case bmi < 15:
      return "Very severely underweight";
    case bmi >= 15 && bmi < 16:
      return "Severely underweight";
    case bmi >= 16 && bmi < 18.5:
      return "Underweight";
    case bmi >= 18.5 && bmi < 25:
      return "Normal (healthy weight)";
    case bmi >= 25 && bmi < 30:
      return "Overweight";
    case bmi >= 30 && bmi < 35:
      return "bese Class I (Moderately obese)";
    case bmi >= 35 && bmi < 40:
      return "Obese Class II (Severely obese)";
    case bmi >= 40:
      return "Obese Class III (Very severely obese)";
    default:
      return "N/A";
  }
};

console.log(calculateBmi(74, 180));
