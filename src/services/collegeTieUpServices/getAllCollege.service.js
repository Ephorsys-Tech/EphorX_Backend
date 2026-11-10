
import CollegeTieUp from "../../model/collegeTieUpModel.js";

const getAllCollegeTieUpsService = async () => {
  return await CollegeTieUp.find().sort({ createdAt: -1 });
};

export default getAllCollegeTieUpsService;
