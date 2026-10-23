const createAdminValidator = (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const errors = [];

  // Validate name
  if (
    typeof name !== "string" ||
    !name.trim()
  ) {
    errors.push({
      field: "name",
      message: "Name is required.",
    });
  }

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

  // Validate phone
  if (
    typeof phone !== "string" ||
    !/^\d{10}$/.test(phone)
  ) {
    errors.push({
      field: "phone",
      message: "Enter a valid 10-digit phone number.",
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

export default createAdminValidator;
