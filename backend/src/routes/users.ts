import { Router, Request, Response } from "express";
import { User } from "../models/user";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Get all");
});

router.post("/", async (req: Request, res: Response) => {
  //  res.send("Add");
  const user = new User({
    name: "Bill",
    email: "bill@initech.com",
    avatar: "https://i.imgur.com/dM7Thhn.png",
  });
  await user.save();

  res.send(user.email);
});

router.get("/:id", (req: Request, res: Response) => {
  res.send("Get");
});

router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});

router.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete");
});

export default router;
