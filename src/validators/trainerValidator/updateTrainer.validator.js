
const updateTrainerValidator = (req, res, next) => {
  const allowedFields = [
    "name",
    "designation",
    "category",
    "specialization",
    "description",
    "experienceYears",
    "status",
  ];

  const updates = Object.keys(req.body);

  // A PATCH request can update either text fields or an uploaded file.
  if (updates.length === 0 && !req.file) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update",
    });
  }

  const invalidFields = updates.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    });
  }

  const stringFields = [
    "name",
    "designation",
    "category",
    "specialization",
    "description",
  ];

  for (const field of stringFields) {
    if (
      req.body[field] !== undefined &&
      typeof req.body[field] !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a string`,
      });
    }
  }

  // Multipart form-data values arrive as strings.
  if (req.body.experienceYears !== undefined) {
    const rawValue = req.body.experienceYears;
    const years = Number(rawValue);

    if (
      String(rawValue).trim() === "" ||
      !Number.isFinite(years) ||
      years < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Experience years must be a non-negative number",
      });
    }

    // Replace the string with a number for the controller/service.
    req.body.experienceYears = years;
  }

  if (
    req.body.status !== undefined &&
    !["draft", "published"].includes(req.body.status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Status must be either draft or published",
    });
  }

  next();
};

export default updateTrainerValidator;
