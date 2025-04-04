export default function yearValidator(year) {
  const maxValidYear = new Date().getFullYear() + 1;
  const errors = [];

  if (String(year).length !== 4 || typeof year !== "number") {
    errors.push("The year must be in a valid format.");
    return errors;
  }

  if (year < maxValidYear - 10 || year > maxValidYear) {
    errors.push(
      `year must be between ${maxValidYear - 10} and ${maxValidYear}`,
    );
  }

  return errors;
}
