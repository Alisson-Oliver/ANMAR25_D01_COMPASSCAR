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

export const validateItems = (req, res, next) => {
  const items = req.body;

  const errors = [];

  if (!Array.isArray(items) || items.length === 0) {
    errors.push("items is required");
    return res.status(400).json({ errors });
  }

  if (items.length > 5) {
    errors.push("items must be a maximum of 5");
  }

  const newItems = items.map((item) => item.toLowerCase());

  const uniqueItems = new Set(newItems);
  if (uniqueItems.size !== items.length) {
    errors.push("items cannot be repeated");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateUpdateCar = (req, res, next) => {
  let { brand, model, year, plate } = req.body;

  let errors = [];
  let yearErros = [];
  let plateErrors = [];

  if (brand) {
    if (!model) {
      errors.push("model must also be informed");
    }
  }

  if (year) {
    yearErros = yearValidator(year);
  }

  if (plate) {
    plate = plate.toUpperCase();
    plateErrors = plateValidator(plate);
  }

  errors = [...errors, ...yearErros, ...plateErrors];
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
