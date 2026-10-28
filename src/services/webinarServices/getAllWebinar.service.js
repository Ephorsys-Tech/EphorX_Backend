import Webinar from "../../model/webinar.model.js";

const getAllWebinarService = async () => {
  return await Webinar.find().sort({ createdAt: -1 });
};

export default getAllWebinarService;