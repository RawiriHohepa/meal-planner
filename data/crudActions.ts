import { Model, connect } from "mongoose";

const connectToDb = async () => {
  await connect(process.env.MONGODB_CONNECTION_STRING || "");
};

const mongooseCrudActions = <IMongooseModel>(
  MongooseModel: Model<IMongooseModel>
) => {
  const getItems = async () => {
    await connectToDb();
    return {
      records: await MongooseModel.find(),
    };
  };

  const getItem = async (id: string) => {
    await connectToDb();
    return await MongooseModel.findById(id);
  };

  const createItem = async (item: IMongooseModel) => {
    const dbItem = new MongooseModel(item);
    await dbItem.save();
    return dbItem;
  };

  const updateItem = async (_id: string, item: IMongooseModel) => {
    const result = await MongooseModel.findByIdAndUpdate(
      _id,
      { ...item, _id },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    return result;
  };

  const deleteItem = async (_id: string) => {
    await MongooseModel.deleteOne({ _id });
  };

  return {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default mongooseCrudActions;
