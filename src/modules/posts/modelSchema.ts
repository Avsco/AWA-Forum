import { model, Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { categories } from "../../models/category";

export interface Interface extends Document {
  username: string;
  autorImage: string;
  idAutor: string;
  title: string;
  content: string;
  category: string;
  likes?: number;
  dislikes?: number;
  comments?: [
    {
      idAutor: string;
      username: string;
      autorImage: string;
      content: string;
    }
  ];
}

const modelSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    autorImage: {
      type: String,
      required: true,
    },
    idAutor: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        idAutor: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        autorImage: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: String,
          require: true,
          default: () => {
            const now = new Date();
            return now.toISOString();
          },
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

modelSchema.plugin(mongoosePaginate);
export default model<Interface>("posts", modelSchema);
