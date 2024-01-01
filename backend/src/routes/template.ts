import { Router, Request, Response } from "express";
import mongooseCrudActions from "../models/mongooseCrudActions";
import { ITemplate, Template } from "../models/template";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = Router();

const { retrieveAllItems, createItem, retrieveItem, updateItem, deleteItem } =
  mongooseCrudActions<ITemplate>(Template);

const validate = (item: ITemplate) => {
  let errors = [];
  if (!item.joinDate) {
    errors.push("New items must have a title");
  }

  return errors;
};

router.get("/", async (req: Request, res: Response) => {
  const items = await retrieveAllItems();
  res.json(items);
});

router.post("/", async (req: Request, res: Response) => {
  const errors = validate(req.body);
  if (errors.length) {
    res
      .status(HTTP_BAD_REQUEST)
      .contentType("text/plain")
      .send(errors.join("; "));
    return;
  }

  const newItem = await createItem(req.body);
  res
    .status(HTTP_CREATED)
    .header("location", `/api/items/${newItem._id}`)
    .json(newItem);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await retrieveItem(id);
  if (item) {
    res.json(item);
  } else {
    res.sendStatus(HTTP_NOT_FOUND);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const newItem = {
    ...req.body,
    _id: id,
  };
  const success = await updateItem(newItem);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteItem(id);
  res.sendStatus(HTTP_NO_CONTENT);
});

export default router;
