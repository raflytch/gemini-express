import { Router, Response, Request } from "express";
import generateRoutes from "./generate.route";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({ message: "API is running" });
});

router.use("/generate", generateRoutes);

export default router;
