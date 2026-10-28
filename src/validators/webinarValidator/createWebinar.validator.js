export const validateCreateWebinar = (req, res, next) => {
  const {
    title,
    description,
    category,
    type,
    date,
    startTime,
    duration,
    availability,
    instructor,
    status,
  } = req.body;

  // Required fields
  if (
    !title ||
    !description ||
    !category ||
    !type ||
    !duration ||
    !instructor
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  // Validate title
  if (typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Title must contain at least 3 characters",
    });
  }

  // Validate description
  if (
    typeof description !== "string" ||
    description.trim().length < 10
  ) {
    return res.status(400).json({
      success: false,
      message: "Description must contain at least 10 characters",
    });
  }

  // Validate webinar type
  if (!["live", "pre-recorded"].includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Type must be live or pre-recorded",
    });
  }

  // Validate live webinar schedule
  if (type === "live") {
    if (!date || !startTime) {
      return res.status(400).json({
        success: false,
        message: "Date and start time are required for live webinars",
      });
    }

    if (Number.isNaN(Date.parse(date))) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid webinar date",
      });
    }

    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(startTime)) {
      return res.status(400).json({
        success: false,
        message: "Start time must use HH:mm format, such as 17:30",
      });
    }
  }

  // Validate duration
  if (
    !Number.isInteger(duration) ||
    duration < 1 ||
    duration > 1440
  ) {
    return res.status(400).json({
      success: false,
      message: "Duration must be between 1 and 1440 minutes",
    });
  }

  // Validate availability
  if (
    availability &&
    !["scheduled", "anytime", "completed"].includes(availability)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid webinar availability",
    });
  }

  // Validate instructor
  if (
    typeof instructor !== "object" ||
    instructor === null ||
    Array.isArray(instructor) ||
    typeof instructor.name !== "string" ||
    !instructor.name.trim() ||
    typeof instructor.designation !== "string" ||
    !instructor.designation.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Instructor name and designation are required",
    });
  }

  // Validate status
  if (
    status &&
    !["draft", "published", "cancelled"].includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid webinar status",
    });
  }

  next();
};