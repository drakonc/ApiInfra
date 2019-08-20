import { Router } from "express";
import permisoontroller from "../controller/permiso.controller";

class PermisoRouter {
  public router = Router();

  constructor() {
    this.config();
  }

  config() {
    //this.router.get("/", rolController.index);
  }
}

const permisoRouter = new PermisoRouter();
export default permisoRouter.router;
