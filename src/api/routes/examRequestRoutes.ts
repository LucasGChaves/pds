import { Router } from "express";
import { ExamRequestController } from "../controllers/examRequestController";
import { Auth } from "../middlewares/auth";
import { validateExamRequest, create, update } from "../middlewares/inputValidation/validateExamRequest";

const router = Router();
const examRequestController = new ExamRequestController();
const auth = new Auth();

router.get("/:id/", auth.secureEndpoingWithJwt, examRequestController.getExamRequest);
router.post("/", validateExamRequest(create), auth.secureEndpoingWithJwt, examRequestController.createExamRequest);
router.put("/:id/", validateExamRequest(update), auth.secureEndpoingWithJwt, examRequestController.updateExamRequest);
router.delete("/:id", auth.secureEndpoingWithJwt, examRequestController.deleteExamRequest);

export default router;