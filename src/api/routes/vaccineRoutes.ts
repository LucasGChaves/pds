import { Router } from "express";
import { VaccineController } from "../controllers/vaccineController";
import { Auth } from "../middlewares/auth";
import { validateVaccine, create } from "../middlewares/inputValidation/validateVaccine";

const router = Router();
const vaccineController = new VaccineController();
const auth = new Auth();

router.get("/:id/", auth.secureEndpoingWithJwt, vaccineController.getVaccine);
router.post("/", validateVaccine(create), auth.secureEndpoingWithJwt, vaccineController.createVaccine);
router.delete("/:id/", auth.secureEndpoingWithJwt, vaccineController.deleteVaccine);

export default router;