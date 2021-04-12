import controller from "./controller";
import { Router } from "express";

const router = Router();
const breakPoint = "/forums";

router.get(`${breakPoint}/:id`, controller.show);
router.get(breakPoint, controller.get);
router.put(`${breakPoint}/:id`, controller.put);
router.post(breakPoint, controller.post);
router.delete(`${breakPoint}/:id`, controller.delete);

export { router as forums };
