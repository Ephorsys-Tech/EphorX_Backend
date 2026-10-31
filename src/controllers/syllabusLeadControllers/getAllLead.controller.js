import getAllSyllabusLead from "../../services/syllabusLeadServices/getAllLead.service.js"

const getAllSyllabusLeadsController = async (req, res) => {
  try {
    const downloads = await getAllSyllabusLead();

    return res.status(200).json({
      success: true,
      count: downloads.length,
      downloads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getAllSyllabusLeadsController;