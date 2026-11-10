import SyllabusLead from "../../model/syllabusLead.model.js"

const getSyllabusLeadById = async (id) => {
  return await SyllabusLead.findById(id);
};

export default getSyllabusLeadById;