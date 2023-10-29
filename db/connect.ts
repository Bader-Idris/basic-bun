import mongoose from "mongoose";
try {
  mongoose.set("strictQuery", false);
} catch (e) {
  console.log(e);
}
const connectDB = (url) => {
  return mongoose.connect(url);
};

export { connectDB };