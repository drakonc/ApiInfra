import { Router } from "express";
import rolController from "../controller/rol.controller";

class RolRouter {
  public router = Router();

  constructor() {
    this.config();
  }

  config() {
    //this.router.get("/", rolController.index);
  }
}

const rolRouter = new RolRouter();
export default rolRouter.router;
