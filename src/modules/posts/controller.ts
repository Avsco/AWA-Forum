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
    if (req.query.title) query.title = req.query.title;
    if (req.query.category) query.category = req.query.category;
    if (req.query.username) query.username = req.query.username;
    if (req.query.idForum) query.idForum = req.query.idForum;
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
    if (req.body.title) model.title = req.body.title;
    if (req.body.content) model.content = req.body.content;
    if (req.body.category) model.category = req.body.category;

    try {
      const newModel = await Model.put(req.params.id, model);
      if (!newModel) return res.status(404).json({ msg: "Resource not found" });

      return res.status(200).json(newModel);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    if (!req.body.idAutor)
      return res.status(400).json({ msg: "require id user" });
    if (!req.body.title) return res.status(400).json({ msg: "require title" });
    if (!req.body.content)
      return res.status(400).json({ msg: "require content" });
    if (!req.body.category)
      return res.status(400).json({ msg: "require category" });
    if (!req.body.idForum)
      return res.status(400).json({ msg: "require id of forum owner" });

    try {
      const newModel = await Model.post(req.body);
      if (!newModel)
        return res.status(400).json({ msg: "Resource was not created" });

      return res.status(200).json(newModel);
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

  async like(req: Request, res: Response): Promise<Response> {
    try {
      const model = await Model.like(req.params.id);
      return res.status(200).json(model);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async disLike(req: Request, res: Response): Promise<Response> {
    try {
      const model = await Model.disLike(req.params.id);
      return res.status(200).json(model);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async comment(req: Request, res: Response): Promise<Response> {
    if (!req.body.idAutor)
      return res.status(400).json({ msg: "require id user" });
    if (!req.body.content)
      return res.status(400).json({ msg: "require content" });
    if (!req.body.autorImage)
      return res.status(400).json({ msg: "require autor image" });
    if (!req.body.username)
      return res.status(400).json({ msg: "require username" });
    if (!req.body.idGroup)
      return res.status(400).json({ msg: "require group id" });

    try {
      const model = await Model.commentPost(
        {
          autorImage: req.body.autorImage,
          username: req.body.username,
          idAutor: req.body.idAutor,
          content: req.body.content,
        },
        req.params.id,
        req.body.idGroup
      );
      if (!model) throw new Error("this user not have permissions to comment");
      return res.status(201).json(model);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }
}

export default new Controller();
