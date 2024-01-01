import mongoose from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { Ingredient } from "../models/ingredient";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const router = Router();

// router.use("/:id", async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params;
//   if (mongoose.isValidObjectId(id)) {
//     next();
//   } else {
//     res.status(HTTP_BAD_REQUEST).contentType("text/plain").send("Invalid ID");
//   }
// });

router.get("/", async (req: Request, res: Response) => {
  const todos = await retrieveAllTodos();
  res.json(todos);
});

router.post("/", async (req: Request, res: Response) => {
  //   if (!req.body.title) {
  //     res
  //       .status(HTTP_BAD_REQUEST)
  //       .contentType("text/plain")
  //       .send("New todos must have a title");
  //     return;
  //   }
  const newTodo = await createTodo(req.body);
  res
    .status(HTTP_CREATED)
    .header("location", `/api/todos/${newTodo._id}`)
    .json(newTodo);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await retrieveTodo(id);
  res.json(todo);

  //   const returnTodo = (todo: any) => {
  //     res.json(todo);
  //   };

  //   await findAndValidateTodo(res, id, returnTodo);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const newTodo = {
    ...req.body,
    _id: id,
  };
  const success = await updateTodo(newTodo);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);

  //   const updateTodo2 = async () => {
  //     const newTodo = {
  //       ...req.body,
  //       _id: id,
  //     };
  //     const success = await updateTodo(newTodo);
  //     res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
  //   };

  //   await findAndValidateTodo(res, id, updateTodo2);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteTodo(id);
  res.sendStatus(HTTP_NO_CONTENT);

  //   const deleteTodo2 = async () => {
  //     await deleteTodo(id);
  //     res.sendStatus(HTTP_NO_CONTENT);
  //   };

  //   await findAndValidateTodo(res, id, deleteTodo2, HTTP_NO_CONTENT);
});

// const findAndValidateTodo = async (
//   res: any,
//   id: any,
//   callbackValidTodo: any,
//   statusCodeOnNotFound = HTTP_NOT_FOUND
// ) => {
//   const todo = await retrieveTodo(id);
//   if (todo) {
//     await callbackValidTodo(todo);
//   } else {
//     res.sendStatus(statusCodeOnNotFound);
//   }
// };

const retrieveAllTodos = async () => {
  return await Ingredient.find();
};

const createTodo = async (ingredient: any) => {
  const dbIngredient = new Ingredient(ingredient);
  await dbIngredient.save();
  return dbIngredient;
};

const retrieveTodo = async (id: any) => {
  return await Ingredient.findById(id);
};

const updateTodo = async (ingredient: any) => {
  const result = await Ingredient.findByIdAndUpdate(
    ingredient._id,
    ingredient,
    {
      new: true,
      useFindAndModify: false,
    }
  );
  return result ? true : false;
};

const deleteTodo = async (id: any) => {
  await Ingredient.deleteOne({ _id: id });
};

export default router;
