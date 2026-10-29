const updateTrainerValidator = (req, res, next) => {
  const allowedFields = [
    "name",
    "designation",
    "category",
    "specialization",
    "description",
    "experienceYears",
    "detailsUrl",
  ];

  const updates = Object.keys(req.body || {});

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
    "detailsUrl",
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

    req.body.experienceYears = years;
  }

  next();
};

export default updateTrainerValidator;