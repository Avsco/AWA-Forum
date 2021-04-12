import { model, Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface Interface extends Document {
  idOwner: string;
  nameOwner: string;
  groupName: string;
  groupImage: string;
  groupInfo: string;
  groupRules: string;
  members?: [
    {
      idMember: string;
      nameMember: string;
      imageMember: string;
      enabledComment: boolean;
      joinOn: string;
    }
  ];
  forums?: [
    {
      idForum: string;
      nameForum: string;
      categoryForum: string;
      descriptionForum: string;
    }
  ];
}

const modelSchema: Schema = new Schema(
  {
    idOwner: {
      type: String,
      required: true,
    },
    nameOwner: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
      unique: true,
    },
    groupImage: {
      type: String,
      required: true,
    },
    groupInfo: {
      type: String,
      required: true,
    },
    groupRules: {
      type: String,
      required: true,
    },
    members: [
      {
        idMember: {
          type: String,
          required: true,
          unique: true,
        },
        nameMember: {
          type: String,
          required: true,
        },
        imageMember: {
          type: String,
          required: true,
        },
        enabledComment: {
          type: Boolean,
          default: false,
        },
        joinOn: {
          type: Date,
          default: () => {
            const now = new Date();
            return now.toISOString();
          },
        },
      },
    ],
    forums: [
      {
        idForum: {
          type: Schema.Types.ObjectId,
          require: true,
        },
        nameForum: {
          type: String,
          require: true,
        },
        descriptionForum: {
          type: String,
        },
        categoryForum: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

modelSchema.plugin(mongoosePaginate);
export default model<Interface>("groups", modelSchema);
