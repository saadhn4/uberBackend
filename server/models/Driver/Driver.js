import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  vehicleDetails: {
    licensePlate: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  availability: { type: Boolean, required: true, default: true },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  rideHistory: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const driverModel = mongoose.model("drivers", driverSchema, "drivers");

export default driverModel;
