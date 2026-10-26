const validateContact = (req, res, next) => {
  const { name, email, phone,course,whatsApp, message } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof message !== "string" ||
    !message.trim()||
    typeof course !== "string" ||
    !message.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Name, email, course and message are required.",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (
    name.trim().length > 100 ||
    email.trim().length > 254 ||
    message.trim().length > 5000 ||
    (phone !== undefined &&
      (typeof phone !== "string" || phone.length > 20)) ||
    (whatsApp !== undefined &&
      (typeof whatsApp !== "string" || whatsApp.length > 20))
  ) {
    return res.status(400).json({
      success: false,
      message: "One or more fields exceed the allowed length.",
    });
  }

  next();
};

export default validateContact;
