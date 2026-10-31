import SyllabusLead from "../../model/syllabusLead.model.js";

const deleteSyllabusLead = async (id) => {
  return await SyllabusLead.findByIdAndDelete(id);
};

export default deleteSyllabusLead;