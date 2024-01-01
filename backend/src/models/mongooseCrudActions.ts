import { Model } from "mongoose";

const mongooseCrudActions = <IMongooseModel>(
  MongooseModel: Model<IMongooseModel>
) => {
  const retrieveAllItems = async () => {
    return await MongooseModel.find();
  };

  const createItem = async (item: IMongooseModel) => {
    const dbItem = new MongooseModel(item);
    await dbItem.save();
    return dbItem;
  };

  const retrieveItem = async (id: string) => {
    return await MongooseModel.findById(id);
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
    retrieveAllItems,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  };
};

export default mongooseCrudActions;
