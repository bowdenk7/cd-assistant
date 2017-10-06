import * as mongoose from "mongoose";
import {User, UserDocument} from "./User";

export type ProjectDocument = mongoose.Document | {
    name: string,
    description?: string,
    marketSize?: number,
    marketSizeUnit?: string,
    creator: UserDocument,
    goals?: [{
        text?: string
    }],
    cohorts?: [{
        text?: string,
    size?: number
    }],
    hypotheses?: [{
        text?: string,
        kind?: string,
        questions?: [string]
    }]
};

// { type: Schema.Types.ObjectId, ref: 'Story' }

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    marketSize: Number,
    marketSizeUnit: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    goals: [{
        text: String
    }],
    cohorts: [{
        text: String,
        size: Number
    }],
    hypotheses: [{
        text: String,
        kind: String,
        questions: [String]
    }]
}, { timestamps: true });

export const Project = mongoose.model("Project", projectSchema);




