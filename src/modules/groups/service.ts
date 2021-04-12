/* Recien trabajamos con las consulatas de la base de datos */
import ModelSchema, { Interface } from "./modelSchema";
import { member } from "./groups.interface";
import { Interface as forum } from "../forums/modelSchema";

class Service {
  async show(id: string): Promise<Interface | null> {
    const model = await ModelSchema.findById(id);
    if (!model) return null;
    return model;
  }

  async get(query: any, options: any): Promise<Interface[] | []> {
    // @ts-ignore
    const model = await ModelSchema.paginate(query, options);
    if (!model) return [];
    return model;
  }

  async put(id: string, newModel: any): Promise<Interface | null> {
    const updated = await ModelSchema.findByIdAndUpdate(id, newModel, {
      new: true,
    });
    if (!updated) return null;
    return updated;
  }

  async post(model: Interface): Promise<Interface> {
    const newModel = new ModelSchema(model);
    await newModel.save();
    return newModel;
  }

  async delete(id: string): Promise<Interface | null> {
    const model = await ModelSchema.findByIdAndDelete(id);
    return model;
  }

  async enableComment(idGroup: string, idMember: string) {
    await ModelSchema.updateOne(
      { _id: idMember, "members.idMember": idGroup },
      { $set: { "members.$.enabledComment": true } }
    );
  }

  async addMember(idGroup: string, member: member) {
    await ModelSchema.findByIdAndUpdate(idGroup, {
      $push: { members: member },
    });
  }

  async addForum(idGroup: string, forum: forum) {
    await ModelSchema.findByIdAndUpdate(idGroup, {
      $push: { forums: forum },
    });
  }
}

export default new Service();
