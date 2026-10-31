import SyllabusLead from "../../model/syllabusLead.model.js";

const getAllSyllabusLeads= async () => {
  return await SyllabusLead.find().sort({ createdAt: -1 });
};

export default getAllSyllabusLeads;