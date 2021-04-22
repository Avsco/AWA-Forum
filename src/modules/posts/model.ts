import service from "./service";
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

  async post(model: Interface, idUser?: string): Promise<Interface | null> {
    return await service.post(model);
  }

  async delete(id: string): Promise<Interface | null> {
    return await service.delete(id);
  }

  async like(id: string): Promise<Interface | null> {
    return await service.like(id);
  }

  async disLike(id: string): Promise<Interface | null> {
    return await service.disLike(id);
  }

  async commentPost(
    comment: comment,
    idPost: string,
    idGroup: string
  ): Promise<Interface | null> {
    if (groupsService.canComment(idGroup, comment.idAutor)) {
      return await service.comment(idPost, comment);
    }
    return null;
  }
}

export default new Model();
