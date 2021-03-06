import { Application } from "express";

import { posts } from "../modules/posts/routes";
import { groups } from "../modules/groups/routes";
import { forums } from "../modules/forums/routes";

export default function (app: Application) {
  app.use(posts);
  app.use(groups);
  app.use(forums);
}
