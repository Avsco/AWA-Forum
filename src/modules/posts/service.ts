import ModelSchema, { Interface } from "./modelSchema";
import { comment } from "./post.interface";

class Service {
  async show(id: string): Promise<Interface | null> {
    const model = await ModelSchema.findById(id);
    if (!model) return null;
    return model;
  }

  async get(query: any, options: any): Promise<Interface[] | []> {
    options.sort = { likes: -1 };
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

  async like(id: string): Promise<Interface | null> {
    return await ModelSchema.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
  }

  async disLike(id: string): Promise<Interface | null> {
    return await ModelSchema.findByIdAndUpdate(
      id,
      { $inc: { disLikes: 1 } },
      { new: true }
    );
  }

  async comment(idPost: string, comment: comment): Promise<Interface | null> {
    return await ModelSchema.findByIdAndUpdate(idPost, {
      $push: { comments: comment },
    });
  }
}

export default new Service();
