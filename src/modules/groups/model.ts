import service from "./service";
import { Interface } from "./modelSchema";
import { member } from "./groups.interface";

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
    return await service.post(model);
  }

  async delete(id: string): Promise<Interface | null> {
    return await service.delete(id);
  }

  async enableComment(idGroup: string, idMember: string): Promise<boolean> {
    return await service.enableComment(idGroup, idMember);
  }

  async addMember(idGroup: string, member: member): Promise<Interface | null> {
    if (!(await service.existMember(idGroup, member.idMember))) {
      return await service.addMember(idGroup, member);
    } else {
      return null;
    }
  }
}

export default new Model();
