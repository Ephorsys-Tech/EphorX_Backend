
const adminLoginValidator = (req, res, next) => {
  const {email, password } = req.body;

  const errors = [];

  // Validate email
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    errors.push({
      field: "email",
      message: "Enter a valid email address.",
    });
  }

  // Validate password
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 72
  ) {
    errors.push({
      field: "password",
      message: "Password must be 8–72 characters.",
    });
  }

  // Return validation errors
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  // All validations passed
  next();
};

export default adminLoginValidator;
