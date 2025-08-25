import { Router } from "express";
import { getSKUs, addSKU, editSKU, removeSKU } from "../controllers/skuController";

const router = Router();

router.get("/", getSKUs);
router.post("/", addSKU);
router.put("/:id", editSKU);
router.delete("/:id", removeSKU);

export default router;
