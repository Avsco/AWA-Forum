/* Recien trabajamos con las consulatas de la base de datos */
import ModelSchema, { Interface } from "./modelSchema";
import { member } from "./groups.interface";
import { Interface as forum } from "../forums/forum.interface";

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

  async enableComment(idGroup: string, idMember: string): Promise<boolean> {
    const operations = await ModelSchema.updateOne(
      { _id: idGroup, "members.idMember": idMember },
      { $set: { "members.$.enabledComment": true } }
    );
    return operations.nModified == 1;
  }

  async addMember(idGroup: string, member: member): Promise<Interface | null> {
    return await ModelSchema.findByIdAndUpdate(
      idGroup,
      {
        $push: { members: member },
      },
      { new: true }
    );
  }

  async existMember(idGroup: string, idMember: string): Promise<boolean> {
    return (
      (
        await ModelSchema.find({
          _id: idGroup,
          "members.idMember": idMember,
        })
      ).length > 0
    );
  }

  async canComment(idGroup: string, idMember: string): Promise<boolean> {
    console.log(idGroup, idMember);

    console.log(
      await ModelSchema.find({
        _id: idGroup,
        members: {
          $elemMatch: {
            idMember: idMember,
            enabledComment: true,
          },
        },
      })
    );

    return (
      (
        await ModelSchema.find({
          _id: idGroup,
          "members.idMember": idMember,
          "members.enabledComment": true,
        })
      ).length > 0
    );
  }
}

export default new Service();
