import { Router, Request, Response } from "express";

const router = Router();

const initialRows = [
  {
    id: 1,
    name: "1",
    age: 25,
    joinDate: new Date(),
    role: "Market",
  },
  {
    id: 2,
    name: "2",
    age: 36,
    joinDate: new Date(),
    role: "Market",
  },
  {
    id: 3,
    name: "3",
    age: 19,
    joinDate: new Date(),
    role: "Market",
  },
  {
    id: 4,
    name: "4",
    age: 28,
    joinDate: new Date(),
    role: "Market",
  },
  {
    id: 5,
    name: "5",
    age: 23,
    joinDate: new Date(),
    role: "Market",
  },
];

router.get("/", (req: Request, res: Response) => {
  res.json(initialRows);
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
