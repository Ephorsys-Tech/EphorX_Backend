import Webinar from "../../model/webinar.model.js";

const updateWebinar = async (webinarId, updateData) => {
  const webinar = await Webinar.findByIdAndUpdate(
    webinarId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  return webinar;
};

export default updateWebinar;