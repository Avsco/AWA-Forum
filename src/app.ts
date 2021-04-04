import express, { Express } from "express";
import cors from "cors";
import router from "./router";

import morgan from "morgan";

class App {
  private port = 5000;
  private app: Express = express();

  constructor() {
    this.config();
    this.initRoutes();
  }

  public initServer = async () => {
    try {
      this.app.listen(this.port, () =>
        console.log(`Listening on http://${"localhost"}:${this.port}/`)
      );
    } catch (error) {
      console.error(error);
    }
  };

  private config = () => {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    if (process.env.NODE_ENV !== "production") this.app.use(morgan("dev"));
  };

  private initRoutes = () => {
    router(this.app);
  };
}

export default new App();
