import { model, Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { categories } from "../../models/category";

export interface Interface extends Document {
  nameForum: string;
  descriptionForum: string;
  categoryForum: string;
  idGroup: string;
}

const modelSchema: Schema = new Schema(
  {
    nameForum: {
      type: String,
      require: true,
    },
    descriptionForum: {
      type: String,
      require: true,
    },
    categoryForum: {
      type: String,
      require: true,
      enum: categories,
    },
    idGroup: {
      type: Schema.Types.ObjectId,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

modelSchema.plugin(mongoosePaginate);
export default model<Interface>("forums", modelSchema);
