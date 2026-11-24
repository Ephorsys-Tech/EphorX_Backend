
import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGODB_URL,
            {
                serverSelectionTimeoutMS: 10000,
            }
        );

        console.log("Database is Connected Successfully");
        console.log("MongoDB Host:", connection.connection.host);

    } catch (err) {
        console.error("Error Connecting To DB:");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);

        process.exit(1);
    }
};

export default connectToDb;
