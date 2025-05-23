import { Router, Request, Response } from "express";
import generateRoutes from "./generate.route";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is running" });
});

router.use("/generate", generateRoutes);

export default router;
