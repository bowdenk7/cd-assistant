import * as mongoose from "mongoose";

export type FeedbackDocument = mongoose.Document & {

};

const feedbackSchema = new mongoose.Schema({

}, { timestamps: true });

export const Feedback = mongoose.model("Feedback", feedbackSchema);