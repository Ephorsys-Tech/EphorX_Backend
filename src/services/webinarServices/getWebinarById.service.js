import Webinar from "../../model/webinar.model.js";

const getWebinarByIdService = async (webinarId) => {
  const webinar = await Webinar.findById(webinarId);

  return webinar;
};

export default getWebinarByIdService;