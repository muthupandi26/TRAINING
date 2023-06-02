// middlewares/validationMiddleware.js

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // Return validation error response
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

module.exports = validate;
