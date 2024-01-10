import { Router, Request, Response } from "express";
import mongooseCrudActions from "../models/mongooseCrudActions";
import { IMeal, Meal } from "../models/meal";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = Router();

const { retrieveAllItems, createItem, retrieveItem, updateItem, deleteItem } =
  mongooseCrudActions<IMeal>(Meal);

const validate = (meal: IMeal) => {
  let errors = [];
  if (!meal.name) {
    errors.push("New meals must have a name");
  }

  return errors;
};

router.get("/", async (req: Request, res: Response) => {
  const meals = await retrieveAllItems();
  res.json(meals);
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

  const newItem = await createItem({
    ...req.body,
    ingredients: req.body.ingredients || [],
  });
  res
    .status(HTTP_CREATED)
    .header("location", `/api/meals/${newItem._id}`)
    .json(newItem);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const meal = await retrieveItem(id);
  if (meal) {
    res.json(meal);
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
