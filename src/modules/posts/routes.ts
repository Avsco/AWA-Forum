import controller from "./controller";
import { Router } from "express";

const router = Router();
const breakPoint = "/posts";

router.get(`${breakPoint}/:id`, controller.show);
router.get(breakPoint, controller.get);
router.put(`${breakPoint}/:id`, controller.put);
router.post(breakPoint, controller.post);
router.delete(`${breakPoint}/:id`, controller.delete);

router.patch(`${breakPoint}/:id/like`, controller.like);
router.patch(`${breakPoint}/:id/dislike`, controller.disLike);
router.patch(`${breakPoint}/:id/comment`, controller.comment);

export { router as posts };
