import mongoose, { Schema } from "mongoose";
import { CONTRACT_SCHEMA, MONGO_CONNECTION_STRING, TRACK_SCHEMA } from "./constants.js";
import { catchAndSaveGenericError, printErrors } from "./errorManager.js";

/**
 * Attempt to connect to out local running MongoDB instance, if we fail to connect we
 * want to let the error propoate and runtime to fail so we do not catch it.
 */
export const connectToLocalMongo = async () => {
    console.log('Connecting...');
    await mongoose.connect(MONGO_CONNECTION_STRING);
    console.log('Connected!');
};

export const createSchemaModels = (): { Contract: mongoose.Model<any>, Track: mongoose.Model<any> } => {
    const contractSchema = new Schema(CONTRACT_SCHEMA);
    const trackSchema = new Schema(TRACK_SCHEMA);

    const Contract = mongoose.model('Contract', contractSchema);
    const Track = mongoose.model('Track', trackSchema);
    
    return { Contract, Track };
};

export const createAndSaveModel = async (Model: mongoose.Model<any>, data: any) => {
    const model = new Model(data);

    await model.save()
    .catch(catchAndSaveGenericError);
};

export const findContract = async (contractModel: mongoose.Model<any>, data: any) => {
    return await contractModel.findOne(data).exec();
};

export const closeConnection = async () => {
    await mongoose.connection.close();
};
