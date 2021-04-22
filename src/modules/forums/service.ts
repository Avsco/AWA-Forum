/* Recien trabajamos con las consulatas de la base de datos */
import ModelSchema, { Interface } from "./modelSchema";

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
}

export default new Service();
