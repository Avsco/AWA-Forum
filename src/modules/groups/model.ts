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

  //TODO: el parametro model tiene que tener la interfaz group pero hasta esta con la otra
  async post(model: Interface, idUser?: string): Promise<Interface | null> {
    // peticion a firebease para objetener lo demas del modelo
    return await service.post(model);
  }

  async delete(id: string): Promise<Interface | null> {
    return await service.delete(id);
  }

  async enableComment(idGroup: string, idUser: string) {
    await service.enableComment(idUser, idGroup);
  }

  // TODO: hacer la peticion de firebase
  async addMember(idGroup: string, member: member) {
    await service.addMember(idGroup, member);
  }
}

export default new Model();
