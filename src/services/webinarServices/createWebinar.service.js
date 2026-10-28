import Webinar from "../../model/webinar.model.js";

export const createWebinarService = async (webinarData) => {
  const webinar = await Webinar.create(webinarData);
  return webinar;
};