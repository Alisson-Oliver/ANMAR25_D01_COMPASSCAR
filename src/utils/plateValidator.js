export default function plateValidator(plate) {
  const errors = [];

  if (!plate || typeof plate !== "string") {
    errors.push("The 'plate' field is required and must be a string.");
    return errors;
  }

  const formattedPlate = plate.trim().toUpperCase();

  if (formattedPlate.length !== 8) {
    errors.push(
      "The plate must have exactly 8 characters in the format 'AAA-1B23'.",
    );
    return errors;
  }

  for (let i = 0; i < 3; i++) {
    if (!(formattedPlate[i] >= "A" && formattedPlate[i] <= "Z")) {
      errors.push(
        `The character '${formattedPlate[i]}' at position ${i + 1} must be a letter from A to Z.`,
      );
    }
  }

  if (formattedPlate[3] !== "-") {
    errors.push(
      "The plate must contain a hyphen '-' in the fourth position (example: 'AAA-1234').",
    );
  }

  if (isNaN(formattedPlate[4])) {
    errors.push(
      `The fifth character '${formattedPlate[4]}' must be a number from 0 to 9.`,
    );
  }

  if (
    !(formattedPlate[5] >= "A" && formattedPlate[5] <= "J") &&
    isNaN(formattedPlate[5])
  ) {
    errors.push(
      `The sixth character '${formattedPlate[5]}' must be a letter from A to J or a number from 0 to 9.`,
    );
  }

  if (isNaN(formattedPlate.slice(6))) {
    errors.push(
      `The last two characters '${formattedPlate.slice(6)}' must be numbers from 0 to 9.`,
    );
  }

  return errors;
}
