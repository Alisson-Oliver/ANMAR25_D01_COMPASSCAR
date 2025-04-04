const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    errors: ["an internal server error occurred"],
  });
};

export default errorHandler;
