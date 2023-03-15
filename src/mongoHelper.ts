import mongoose, { Schema } from "mongoose";
import { CONTRACT_SCHEMA, MONGO_CONNECTION_STRING, TRACK_SCHEMA } from "./constants.js";
import { catchAndSaveGenericError, printErrors } from "./errorManager.js";

let contractModel: mongoose.Model<any>;
let trackModel: mongoose.Model<any>;

/**
 * Attempt to connect to out local running MongoDB instance, if we fail to connect we
 * want to let the error propoate and runtime to fail so we do not catch it.
 */
export const connectToLocalMongo = async () => {
    console.log('Connecting...');
    await mongoose.connect(MONGO_CONNECTION_STRING);
    console.log('Connected!');
};

export const createSchemaModels = () => {
    const contractSchema = new Schema(CONTRACT_SCHEMA);
    const trackSchema = new Schema(TRACK_SCHEMA);

    const Contract = mongoose.model('Contract', contractSchema);
    const Track = mongoose.model('Track', trackSchema);
    
    contractModel = Contract;
    trackModel = Track;
};

export const createAndSaveContract = async (data: any) => {
    const contract = new contractModel(data);

    await contract.save()
    .catch(catchAndSaveGenericError);
};

export const createAndSaveTrack = async (data: any) => {
    const track = new trackModel(data);

    await track.save()
    .catch(catchAndSaveGenericError);
};

export const findContract = async (data: any) => {
    return await contractModel.findOne(data).exec();
};

export const closeConnection = async () => {
    await mongoose.connection.close();
    printErrors();
};
