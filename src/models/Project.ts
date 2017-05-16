
import * as mongoose from "mongoose";

export type ProjectModel = mongoose.Document & {
  name: string,
  description: string,
  marketSize: number,
  marketSizeUnit: string
};

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  marketSize: Number,
  marketSizeUnit: String,
}, { timestamps: true });

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
export const Project = mongoose.model("Project", projectSchema);