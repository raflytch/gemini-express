import express from "express";
import cors from "cors";
import helmet from "helmet";
import config from "./config";
import routes from "./routes";
import { notFound, errorHandler } from "./middlewares";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.nodeEnv} mode on port ${config.port}`
  );
});

export default app;
