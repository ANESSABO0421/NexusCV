import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://aani042123_db_user:nexus123@cluster0.ezehuj1.mongodb.net/NexusCV"
    )
    .then(() => {
      console.log("MongoDB atlas connected");
    });
};
