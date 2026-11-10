
const createTrainerValidator = (req, res, next) => {
  const {
    name,
    designation,
    category,
    specialization,
    description,
    experienceYears,
    status,
  } = req.body;

  // Check required text fields
  if (
    !name?.trim() ||
    !designation?.trim() ||
    !category?.trim() ||
    !specialization?.trim() ||
    !description?.trim() ||
    experienceYears === undefined ||
    experienceYears === null ||
    experienceYears === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required trainer fields",
    });
  }

  // Convert form-data string to number
  const years = Number(experienceYears);

  if (!Number.isFinite(years) || years < 0) {
    return res.status(400).json({
      success: false,
      message: "Experience years must be a non-negative number",
    });
  }

  // Validate optional status
  if (
    status !== undefined &&
    !["draft", "published"].includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Status must be draft or published",
    });
  }

  // Make the converted number available to the controller
  req.body.experienceYears = years;

  next();
};

export default createTrainerValidator;
