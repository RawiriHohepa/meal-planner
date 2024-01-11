import { Router, Request, Response } from "express";
import mongooseCrudActions from "../models/mongooseCrudActions";
import { IPlanner, Planner } from "../models/planner";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = Router();

const { retrieveAllItems, createItem, retrieveItem, updateItem, deleteItem } =
  mongooseCrudActions<IPlanner>(Planner);

const validate = (planner: IPlanner) => {
  //   let errors = [];
  //   if (!planner.name) {
  //     errors.push("New planners must have a title");
  //   }

  //   return errors;
  return [];
};

router.get("/", async (req: Request, res: Response) => {
  const planners = await retrieveAllItems();
  res.json(planners);
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
    .header("location", `/api/planners/${newItem._id}`)
    .json(newItem);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const planner = await retrieveItem(id);
  if (planner) {
    res.json(planner);
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
