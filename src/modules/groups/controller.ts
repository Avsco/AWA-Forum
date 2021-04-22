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
    if (req.query.groupName) query.groupName = req.query.groupName;
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
    if (req.body.groupName) model.groupName = req.body.groupName;
    if (req.body.groupImage) model.groupImage = req.body.groupImage;
    if (req.body.groupInfo) model.groupInfo = req.body.groupInfo;
    if (req.body.groupRules) model.groupRules = req.body.groupRules;

    try {
      const newModel = await Model.put(req.params.id, model);
      if (!newModel) return res.status(404).json({ msg: "Resource not found" });

      return res.status(200).json(newModel);
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    if (!req.body.idOwner)
      return res.status(400).json({ msg: "require id owner" });
    if (!req.body.groupName)
      return res.status(400).json({ msg: "require group name" });
    if (!req.body.groupImage)
      return res.status(400).json({ msg: "require group image" });
    if (!req.body.groupInfo)
      return res.status(400).json({ msg: "require group info" });
    if (!req.body.groupRules)
      return res.status(400).json({ msg: "require group rules" });

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

  async enableComment(req: Request, res: Response): Promise<Response> {
    const idUser: string = String(req.params.idUser);

    try {
      if (await Model.enableComment(req.params.idGroup, idUser)) {
        return res.status(200).json({ msg: "sucess update" });
      } else {
        throw new Error("The idGroup or idUser dont exist");
      }
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }

  async addMember(req: Request, res: Response): Promise<Response> {
    if (!req.body.idMember)
      return res.status(400).json({ msg: "require id member" });

    try {
      const model = await Model.addMember(req.params.id, req.body);
      if (model) {
        return res.status(200).json(model);
      } else {
        throw new Error("The group dont exist or this member is on the group");
      }
    } catch (error) {
      return res.status(422).json({ code: error.code, msg: error.message });
    }
  }
}

export default new Controller();
