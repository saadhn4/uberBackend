import express from "express";
import config from "config";
import "./utils/dbConnect.js";
import customerRouter from "./controllers/customer/index.js";
import driverRouter from "./controllers/driver/index.js";
import rideRouter from "./controllers/ride/index.js";
import publicRouter from "./controllers/public/index.js";

const app = express();
app.use(express.json());
const PORT = config.get("PORT");

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello world!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/api/public", publicRouter);
app.use("/api/customers", customerRouter);
app.use("/api/drivers", driverRouter);
app.use("/api/rides", rideRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
