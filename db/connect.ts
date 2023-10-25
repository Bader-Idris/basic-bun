import mongoose from "mongoose";
try {
  mongoose.set("strictQuery", false);
} catch (e) {
  console.log(e);
}
const connectDB = (url) => {
  return mongoose.connect(url//, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   // useFindAndModify: false,
  //   // useCreateIndex: true,
  // }
  );
};

export { connectDB };