import service from "./service";
import GroupService from "../groups/service";
import { Interface } from "./modelSchema";

class Model {
  async show(id: string): Promise<Interface | null> {
    return await service.show(id);
  }

  async get(query: any, options: any): Promise<Interface[] | []> {
    return await service.get(query, options);
  }

  async put(id: string, model: any): Promise<Interface | null> {
    return await service.put(id, model);
  }

  async post(model: Interface): Promise<Interface | null> {
    await GroupService.addForum(model.idGroup, {
      idForum: model.id,
      nameForum: model.nameForum,
      descriptionForum: model.descriptionForum,
      categoryForum: model.categoryForum,
    });
    return await service.post(model);
  }

  async delete(id: string): Promise<Interface | null> {
    return await service.delete(id);
  }
}

export default new Model();
