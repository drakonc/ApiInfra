import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        res.status(200).json({mensaje: 'Bienbenido Api Infraestructura'})
    }

}

const indexController = new IndexController();
export default indexController;