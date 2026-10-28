const updateTrainerValidator = (req, res, next) => {
  const allowedFields = [
    "name",
    "designation",
    "avatar",
    "category",
    "specialization",
    "description",
    "experienceYears",
    "buttonText",
    "detailsUrl",
    "status"
  ];

  const updates = Object.keys(req.body);

  if (updates.length === 0) {
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
    "avatar",
    "buttonText",
    "detailsUrl",
  ];

  for (const field of stringFields) {
    if (
      req.body[field] !== undefined &&
      req.body[field] !== null &&
      typeof req.body[field] !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a string`,
      });
    }
  }

  if (
    req.body.experienceYears !== undefined &&
    (
      typeof req.body.experienceYears !== "number" ||
      !Number.isFinite(req.body.experienceYears) ||
      req.body.experienceYears < 0
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Experience years must be a non-negative number",
    });
  }

  if (
    req.body.status !== undefined &&
    !["draft", "published"].includes(req.body.status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Status must be draft or published",
    });
  }

  next();
};

export default updateTrainerValidator;
