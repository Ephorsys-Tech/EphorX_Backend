const updateWebinarValidator = (req, res, next) => {
  const {
    title,
    description,
    category,
    type,
    thumbnail,
    date,
    startTime,
    timezone,
    duration,
    availability,
    instructor,
    status,
    attendeeCount,
  } = req.body;

  const allowedFields = [
    "title",
    "description",
    "category",
    "type",
    "thumbnail",
    "date",
    "startTime",
    "timezone",
    "duration",
    "availability",
    "instructor",
    "status",
  ];

  const requestFields = Object.keys(req.body);

  const hasBodyFields = Object.keys(req.body).length > 0;

  const hasUploadedFiles =
    (req.files?.thumbnail?.length ?? 0) > 0 ||
    (req.files?.instructorAvatar?.length ?? 0) > 0;

  if (!hasBodyFields && !hasUploadedFiles) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update",
    });
  }
  const invalidFields = requestFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must contain at least 3 characters",
      });
    }
  }

  if (description !== undefined) {
    if (
      typeof description !== "string" ||
      description.trim().length < 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Description must contain at least 10 characters",
      });
    }
  }

  if (
    type !== undefined &&
    !["live", "pre-recorded"].includes(type)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid webinar type",
    });
  }

  if (
    duration !== undefined &&
    (!Number.isInteger(duration) || duration < 1 || duration > 1440)
  ) {
    return res.status(400).json({
      success: false,
      message: "Duration must be between 1 and 1440 minutes",
    });
  }

  if (
    availability !== undefined &&
    !["scheduled", "anytime", "completed"].includes(availability)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid webinar availability",
    });
  }

  if (
    status !== undefined &&
    !["draft", "published", "cancelled"].includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid webinar status",
    });
  }

  if (date !== undefined && date !== null && Number.isNaN(Date.parse(date))) {
    return res.status(400).json({
      success: false,
      message: "Invalid webinar date",
    });
  }

  if (
    startTime !== undefined &&
    startTime !== null &&
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(startTime)
  ) {
    return res.status(400).json({
      success: false,
      message: "Start time must use HH:mm format",
    });
  }

  if (instructor !== undefined) {
    if (
      !instructor ||
      typeof instructor !== "object" ||
      Array.isArray(instructor) ||
      (instructor.name !== undefined &&
        (typeof instructor.name !== "string" ||
          !instructor.name.trim())) ||
      (instructor.designation !== undefined &&
        (typeof instructor.designation !== "string" ||
          !instructor.designation.trim()))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid instructor details",
      });
    }
  }

  if (thumbnail !== undefined && thumbnail !== null && typeof thumbnail !== "string") {
    return res.status(400).json({
      success: false,
      message: "Thumbnail must be a string or null",
    });
  }

  if (timezone !== undefined && typeof timezone !== "string") {
    return res.status(400).json({
      success: false,
      message: "Timezone must be a string",
    });
  }

  if (category !== undefined && typeof category !== "string") {
    return res.status(400).json({
      success: false,
      message: "Category must be a string",
    });
  }

  next();
};

export default updateWebinarValidator;