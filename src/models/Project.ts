import * as mongoose from "mongoose";
import {User, UserDocument} from "./User";

export interface ProjectDocument extends mongoose.Document {
    name: string;
    description?: string;
    targetMarket?: string;
    marketSize?: number;
    marketSizeUnit?: string;
    creator: UserDocument;
    segments?: [{
        _id: mongoose.Types.ObjectId
        name?: string,
        size?: number,
        description?: string
    }];
    goals?: [{
        text?: string
    }];
    cohorts?: [{
        text?: string,
    size?: number
    }];
    hypotheses?: [{
        _id: mongoose.Types.ObjectId,
        text?: string,
        kind?: string,
        questions?: [string]
    }];
}

// { type: Schema.Types.ObjectId, ref: 'Story' }

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    targetMarket: String,
    marketSize: Number,
    marketSizeUnit: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    segments: [{
        id: {type: mongoose.Schema.Types.ObjectId},
        name: String,
        size: Number,
        description: String
    }],
    goals: [{
        text: String
    }],
    cohorts: [{
        text: String,
        size: Number
    }],
    hypotheses: [{
        _id: {type: mongoose.Schema.Types.ObjectId},
        text: String,
        kind: String,
        questions: [String]
    }]
}, { timestamps: true });

export const Project = mongoose.model<ProjectDocument>("Project", projectSchema);