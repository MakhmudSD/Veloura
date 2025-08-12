import dotenv from "dotenv";
dotenv.config();
import server from "./app"

import mongoose from "mongoose";
import app from "./app";
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB Connection succeed");
    const PORT = process.env.PORT;
    server.listen(PORT, function () {
      console.info(`This server is running successfully on port: ${PORT}`);
      console.info(`Admin Project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => {
    console.log("ERROR on Connection to MongoDB", err);
  });
