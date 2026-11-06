import CollegeTieUp from "../../model/collegeTieUpModel.js";

const getCollegeTieUpByIdService = async (id) => {
  const college = await CollegeTieUp.findById(id);

  return college;
};

export default getCollegeTieUpByIdService;