import service from "./service";
import forumsService from "../forums/service";
import groupsService from "../groups/service";
import { Interface } from "./modelSchema";
import { comment } from "./post.interface";

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
    await forumsService.addPost(model.idForum, model.id);
    // peticion a firebease para objetener lo demas del modelo
    return await service.post(model);
  }

  async delete(id: string): Promise<Interface | null> {
    return await service.delete(id);
  }

  async like(id: string) {
    await service.like(id);
  }

  async disLike(id: string) {
    await service.disLike(id);
  }

  async commentPost(comment: comment, idPost: string, idGroup: string) {
    if (groupsService.canComment(idGroup, comment.idAutor))
      throw new Error("this user not have permissions to comment");
    await service.comment(idPost, comment);
  }
}

export default new Model();
