import express from "express";
import mongoose from "mongoose";
import route from "./routes/route.js";

const app = express();
app.use(express.json());


app.use("/", route);

mongoose
  .connect("mongodb+srv://TSDB:TSDB123@cluster0.s97ln.mongodb.net/lueziod", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Lueziod Assignment - Database Connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
