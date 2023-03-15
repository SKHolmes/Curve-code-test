import { Schema } from 'mongoose';

/* STRINGS */
export const FILE_NAME = 'Track Import Test.xlsx';
export const MONGO_CONNECTION_STRING = 'mongodb://127.0.0.1:27017';

/* SCHEMAS */
export const CONTRACT_SCHEMA = {
    Name: { 
        type: String,
        required: true
    }
};

export const TRACK_SCHEMA = {
    Title: {
        type: String,
        required: true
    },
    Version: String,
    Artist: String,
    ISRC: {
        type: String,
        requried: true
    },
    'P Line': String,
    Aliases: [String],
    'Contract ID': {
        type: Schema.Types.ObjectId,
        ref: 'Contract'
    }
}