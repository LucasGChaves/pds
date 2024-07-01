import { Router } from "express";
import { ExamRequestController } from "../controllers/examRequestController";
import { Auth } from "../middlewares/auth";
import { validateExamRequest, create, update } from "../middlewares/inputValidation/validateExamRequest";

const router = Router();
const examRequestController = new ExamRequestController();
const auth = new Auth();

router.get("/exam/:id/", auth.secureEndpoingWithJwt, examRequestController.getExamRequest);
router.post("/exam/", validateExamRequest(create), auth.secureEndpoingWithJwt, examRequestController.createExamRequest);
router.put("/exam/:id/", validateExamRequest(update), auth.secureEndpoingWithJwt, examRequestController.updateExamRequest);
router.delete("/exam/:id", auth.secureEndpoingWithJwt, examRequestController.deleteExamRequest);

export default router;