import Webinar from "../../model/webinar.model.js";

const updateWebinar = async (webinarId, updateData) => {
  const webinar = await Webinar.findById(webinarId);

  if (!webinar) {
    return null;
  }

  const updates = { ...updateData };

  if (updates.instructor) {
    updates.instructor = {
      ...webinar.instructor.toObject(),
      ...updates.instructor,
    };
  }

  Object.assign(webinar, updates);

  await webinar.save();

  return webinar;
};

export default updateWebinar;
