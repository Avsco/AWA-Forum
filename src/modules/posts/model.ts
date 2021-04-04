import service from "./service";
import { Interface } from "./modelSchema";
import { comment } from "./post.interface";
// import { post } from "./post.dto";

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

  //el parametro model tiene que tener la interfaz post pero hasta.. esta con la otra
  async post(model: Interface, idUser?: string): Promise<Interface | null> {
    // peticion a firebease para objetener lo demas del modelo
    return await service.post(model);
  }

  async delete(id: string): Promise<Interface | null> {
    return await service.delete(id);
  }

  async like(id: string) {
    await service.like(id, 1);
  }

  async disLike(id: string) {
    await service.like(id, -1);
  }

  async commentPost(comment: comment, id: string) {
    await service.comment(id, comment);
  }
}

export default new Model();
