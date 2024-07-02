import { Router } from "express";
import { PetController } from "../controllers/petController";
import { Auth } from "../middlewares/auth";
import { validatePet, create, update } from "../middlewares/inputValidation/validatePet";

const router = Router();
const petController = new PetController();
const auth = new Auth();

router.get("/:id/", auth.secureEndpoingWithJwt, petController.getPetById);
router.post("/", validatePet(create), auth.secureEndpoingWithJwt, petController.createPet);
router.put("/:id/", validatePet(update), auth.secureEndpoingWithJwt, petController.updatePet);
router.delete("/:id/", auth.secureEndpoingWithJwt, petController.deletePet);
router.get("/:id/vaccines/", auth.secureEndpoingWithJwt, petController.getVaccines);

export default router;