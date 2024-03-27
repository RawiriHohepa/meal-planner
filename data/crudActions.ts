import { Model } from "mongoose";

const mongooseCrudActions = <IMongooseModel>(
  MongooseModel: Model<IMongooseModel>
) => {
  const getItems = async () => {
    return await MongooseModel.find();
  };

  const getItem = async (id: string) => {
    return await MongooseModel.findById(id);
  };

  const createItem = async (item: IMongooseModel) => {
    const dbItem = new MongooseModel(item);
    await dbItem.save();
    return dbItem;
  };

  const updateItem = async (item: IMongooseModel & { _id: string }) => {
    const result = await MongooseModel.findByIdAndUpdate(item._id, item, {
      new: true,
      useFindAndModify: false,
    });
    return !!result;
  };

  const deleteItem = async (id: string) => {
    await MongooseModel.deleteOne({ _id: id });
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
