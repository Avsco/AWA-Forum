import { Request, Response } from "express";
import Model from "./model";

class Controller {
  async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const model = await Model.show(id);
      if (!model) return res.status(404).json({ msg: "Resource not found" });

      return res.status(200).json(model);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    let query: any = {};
    let options: any = {};
    if (req.query.nameForum) query.nameForum = req.query.nameForum;
    if (req.query.categoryForum) query.categoryForum = req.query.categoryForum;
    if (req.query.idGroup) query.idGroup = req.query.idGroup;
    if (req.query.page) options.page = req.query.page;

    try {
      const model = await Model.get(query, options);

      return res.status(200).json(model);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async put(req: Request, res: Response): Promise<Response> {
    let model: any = {};
    if (req.body.nameForum) model.nameForum = req.body.nameForum;
    if (req.body.descriptionForum)
      model.descriptionForum = req.body.descriptionForum;
    if (req.body.categoryForum) model.categoryForum = req.body.categoryForum;

    try {
      const newModel = await Model.put(req.params.id, model);
      if (!newModel) return res.status(404).json({ msg: "Resource not found" });

      return res.status(200).json(newModel);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    if (!req.body.nameForum)
      return res.status(400).json({ msg: "require name forum" });
    if (!req.body.descriptionForum)
      return res.status(400).json({ msg: "require description forum" });
    if (!req.body.categoryForum)
      return res.status(400).json({ msg: "require category forum" });
    if (!req.body.idGroup)
      return res.status(400).json({ msg: "require id group owner" });

    try {
      const newModel = await Model.post(req.body);
      if (!newModel)
        return res.status(400).json({ msg: "Resource was not created" });

      return res.status(201).json(newModel);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const model = await Model.delete(req.params.id);
      if (!model) res.status(404).json({ msg: "Resource not found" });
      return res.status(200).json(model);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }
}

export default new Controller();
