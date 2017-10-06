import * as mongoose from "mongoose";

export type ProjectDocument = mongoose.Document & {

};

const projectSchema = new mongoose.Schema({

}, { timestamps: true });

export const Project = mongoose.model("Project", projectSchema);