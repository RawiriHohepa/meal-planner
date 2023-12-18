import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Get all");
});

router.post("/", (req: Request, res: Response) => {
  res.send("Add");
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
