import controller from "./controller";
import { Router } from "express";

const router = Router();
const breakPoint = "/groups";

router.get(`${breakPoint}/:id`, controller.show);
router.get(breakPoint, controller.get);
router.put(`${breakPoint}/:id`, controller.put);
router.post(breakPoint, controller.post);
router.delete(`${breakPoint}/:id`, controller.delete);
router.patch(
  `${breakPoint}/:idGroup/enable-comment/:idUser`,
  controller.enableComment
);
router.patch(`${breakPoint}/:id/add-member`, controller.addMember);

export { router as groups };
