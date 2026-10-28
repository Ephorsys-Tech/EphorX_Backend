
const createTrainerValidator = (req, res, next) => {
  const {
    name,
    designation,
    category,
    specialization,
    description,
    experienceYears,
  } = req.body;

  // Check required fields
  if (
    !name ||
    !designation ||
    !category ||
    !specialization ||
    !description ||
    experienceYears === undefined ||
    experienceYears === null
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required trainer fields",
    });
  }

  // Validate string fields
  if (
    typeof name !== "string" ||
    typeof designation !== "string" ||
    typeof category !== "string" ||
    typeof specialization !== "string" ||
    typeof description !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Trainer text fields must be strings",
    });
  }

  // Validate experience
  if (
    typeof experienceYears !== "number" ||
    !Number.isFinite(experienceYears) ||
    experienceYears < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Experience years must be a non-negative number",
    });
  }

  // Validate optional status
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

export default createTrainerValidator;
