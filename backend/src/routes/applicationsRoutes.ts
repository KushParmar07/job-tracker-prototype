import applicationsController from "../controllers/applicationsController";
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const applicationsRouter = express.Router();
applicationsRouter.use(authenticateToken);

applicationsRouter.get("/", applicationsController.getApplications);
applicationsRouter.get("/:id", applicationsController.getApplication);
applicationsRouter.post("/", applicationsController.createApplication);
applicationsRouter.delete("/:id", applicationsController.deleteApplication);
applicationsRouter.put("/:id", applicationsController.updateApplication);

export default applicationsRouter;
