import mongoose, { ConnectionOptions } from "mongoose";

class Database {
  private URI: string;
  private config: ConnectionOptions;

  constructor() {
    // this.URI = `mongodb://${"localhost"}:${27017}/${"prueba"}`;
    this.URI = `mongodb+srv://minka:gatitos123@forum.mt7wy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    this.config = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
  }

  public init = async () => {
    await this.connect();
  };

  private connect = async () => {
    try {
      await mongoose.connect(this.URI, this.config);
      console.log("database conected");
    } catch (error) {
      console.error(error);
    }
  };
}

export default new Database();
