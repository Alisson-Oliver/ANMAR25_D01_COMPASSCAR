import plateValidator from "../utils/plateValidator.js";
import yearValidator from "../utils/yearValidator.js";

export const validateAddCar = (req, res, next) => {
  let { brand, model, year, plate } = req.body;
  let errors = [];

  if (!brand) errors.push("brand is required");
  if (!model) errors.push("model is required");
  if (!year) errors.push("year is required");
  if (!plate) errors.push("plate is required");

  if (plate) {
    plate = plate.toUpperCase();
  }

  const plateErrors = plateValidator(plate);
  const yearErros = yearValidator(year);

  errors = [...errors, ...yearErros, ...plateErrors];

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
