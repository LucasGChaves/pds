import { Router } from "express";
import { VaccineController } from "../controllers/vaccineController";
import { Auth } from "../middlewares/auth";

const router = Router();
const vaccineController = new VaccineController();
const auth = new Auth();

router.get("/vaccine/:id/", auth.secureEndpoingWithJwt, vaccineController.getVaccine);
router.post("/vaccine/", auth.secureEndpoingWithJwt, vaccineController.createVaccine);
router.delete("/vaccine/:id", auth.secureEndpoingWithJwt, vaccineController.deleteVaccine);

export default router;