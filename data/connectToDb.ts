import { connect } from "mongoose";

const connectToDb = async () => {
  await connect(process.env.MONGODB_CONNECTION_STRING || "");
};

export default connectToDb;
