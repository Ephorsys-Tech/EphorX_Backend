import Trainer from "../../model/trainer.model.js";


const getAllTrainers = async () => {
  const trainers = await Trainer.find({
    status: "published",
  }).sort({ createdAt: -1 });

  return trainers;
};

export default getAllTrainers;
