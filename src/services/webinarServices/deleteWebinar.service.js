import Webinar from "../../model/webinar.model.js";

const deleteWebinarService = async (webinarId) => {
  const webinar = await Webinar.findByIdAndDelete(webinarId);

  return webinar;
};

export default deleteWebinarService;