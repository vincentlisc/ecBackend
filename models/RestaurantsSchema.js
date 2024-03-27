import mongoose from "mongoose";

const RestaurantsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String },
  photo: { type: String },
  rating: { type: Number },
  cuisine: { type: String },
  price: { type: Number },
  description: { type: String },
  opening: { type: String },
  closing: { type: String },
  phone: { type: Number },
  email: { type: String },
});

export default mongoose.model("Restaurants", RestaurantsSchema);
