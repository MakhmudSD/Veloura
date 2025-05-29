import dotenv from "dotenv";
dotenv.config()

import mongoose, { mongo } from "mongoose";
import app from "./app"

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connected successfully");
    const PORT = process.env.PORT;
    app.listen(PORT, function () {
      console.info(`The app is running successfully on ${PORT}`);
      console.info(`Admin Project is on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => {
    console.info("Error on MongoDB connection", err);
  });