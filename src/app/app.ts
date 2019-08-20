import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

//Importacion de las Rutas
import indexRouter from "./routes/index.routes";
import tsolicitudRouter from "./routes/tsolicitud.routes";
import rolRouter from "./routes/rol.routes";
import permisoRouter from "./routes/permiso.routes";

export class App {
  private app: Application;
  private port?: number | string;

  constructor(port?: number | string) {
    this.port = port;
    this.app = express();
    this.seting();
    this.middleware();
    this.routers();
  }

  seting(): void {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  middleware(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routers(): void {
    this.app.use("/", indexRouter);
    this.app.use("/api", tsolicitudRouter);
    this.app.use("/api", rolRouter);
    this.app.use("/api", permisoRouter);
  }

  async listen() {
    await this.app.listen(this.app.get("port"), () => {
      console.log(`Servidor Corriendo en el Puerto ${this.app.get("port")}`);
    });
  }
}
