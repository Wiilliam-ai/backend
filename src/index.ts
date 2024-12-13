import express from "express";
import cors from "cors";
import { ModulesRoutes } from "./modules/modules.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", ModulesRoutes.routesApp);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
