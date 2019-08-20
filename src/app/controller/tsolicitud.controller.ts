import { Request, Response } from "express";
import mysql from "../config/database";
import { TSolicitud } from "../model/tsolicitud.model";

class TSolicitudController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const result = await mysql.query("SELECT * FROM tsolicitud");
    if (result.length > 0) return res.status(200).json(result);
    else return res.status(200).json({ result: "No Hay Tipos de Solicitudes Reguistradas" });
  }

  public async listarOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await mysql.query("SELECT * FROM tsolicitud WHERE id = ?", [id]);
    if (result.length > 0) return res.status(200).json(result[0]);
    else return res.status(200).json({ result: "No se Encontro el Tipos de Solicitudes Buscada" });
  }

  public async insertar(req: Request, res: Response): Promise<Response> {
    const newtsolicitud: TSolicitud = req.body;
    const result = await mysql.query("INSERT INTO tsolicitud SET ?", [newtsolicitud]);
    if (result.serverStatus === 2) return res.status(200).json({ result: "Se Inserto el Tipo de Solicitud " + newtsolicitud.tsolicitud + " Correctamente" });
    else return res.status(200).json({ result: "Error al Inserto el Tipo de Solicitud " + newtsolicitud.tsolicitud });
  }

  public async actualizar(req: Request, res: Response): Promise<Response> {
    const tsolicitid: TSolicitud = req.body;
    const { id } = req.params;
    const result = await mysql.query("UPDATE tsolicitud SET ? WHERE id = ?", [tsolicitid, id]);
    if (result.serverStatus === 2) return res.status(200).json({ result: "Se Actualizo Correctamente El Tipo de Solicitud" });
    else return res.status(200).json({ result: "Error Al Actualizar El Tipo de Solicitud" });
  }

  public async eliminar(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await mysql.query("DELETE FROM tsolicitud WHERE id = ?", [id]);
    if (result.serverStatus === 2) return res.status(200).json({ result: "Se Elimino el Tipo de Solicitud Correctamente" });
    else return res.status(200).json({ result: "Error al Eliminar el Tipo de Solicitud" });
  }
}

const tsolicitudController = new TSolicitudController();
export default tsolicitudController;
