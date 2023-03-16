import mongoose, { Schema } from "mongoose";
import { connectToLocalMongo, createAndSaveModel, createSchemaModels, findContract } from "../src/mongoHelper.js";
import { CONTRACT_SCHEMA, MONGO_CONNECTION_STRING, TRACK_SCHEMA } from "../src/constants.js";
import { failSaveSpy, failureConstructorSpy, execSpy, mockError, MockModelFail, MockModelSuccess, successConstructorSpy, successSaveSpy } from "./testData/mockHelpers.js";
import { errors } from "../src/errorManager.js";

jest.mock('mongoose');

describe('MongoHelper tests', () => {

    afterEach(() => {
        // Interestingly array length is writeable, who knew.
        errors.length = 0;
    });

    it('should call mongoose connect with the correct connection string', async () => {
        // When
        const spy = jest.spyOn(mongoose, 'connect');

        // Then
        await connectToLocalMongo();

        // Expect
        expect(spy).toBeCalled();
        expect(spy).toBeCalledWith(MONGO_CONNECTION_STRING);
    });

    it('should create schema models correctly', () => {
        // When
        const dummyContractSchema = { Name: "Contract" };
        const dummyTrackSchema = { Name: "Track" };
        (Schema.prototype.constructor as jest.Mock).mockImplementationOnce(() => {
            return dummyContractSchema;
        }).mockImplementationOnce(() => {
            return dummyTrackSchema;
        });

        // Then
        createSchemaModels();

        // Expect
        expect(Schema.prototype.constructor).toBeCalledTimes(2);
        expect(Schema.prototype.constructor).toBeCalledWith(CONTRACT_SCHEMA);
        expect(Schema.prototype.constructor).toBeCalledWith(TRACK_SCHEMA);
        expect(mongoose.model).toBeCalledTimes(2);
        expect(mongoose.model).toBeCalledWith('Contract', dummyContractSchema);
        expect(mongoose.model).toBeCalledWith('Track', dummyTrackSchema);
    });

    it('should save models correctly', async () => {
        // When 
        const fakeData = { Name: "contract"}

        // Then
        await createAndSaveModel(MockModelSuccess, fakeData);

        // Expect
        expect(successConstructorSpy).toBeCalledTimes(1);
        expect(successConstructorSpy).toBeCalledWith(fakeData);
        expect(successSaveSpy).toBeCalledTimes(1);
    });

    it('should catch and save an error if a model save goes wrong', async () => {
        // When
        const fakeData = { Name: "contract"}

        // Then
        await createAndSaveModel(MockModelFail, fakeData);

        expect(failureConstructorSpy).toBeCalledTimes(1);
        expect(failureConstructorSpy).toBeCalledWith(fakeData);
        expect(failSaveSpy).toBeCalledTimes(1);
        expect(errors).toEqual([{"errorMessage": mockError}])
    });

    // Admittedly not a very useful test, we are on the borderline of testing mongoose functionality. These lines will 
    // complain in the coverage report however so we cover them anyway. This may be hinting at a future refactoring opportunity!
    it('should find a contract correctly', async () => {
        // When

        // Then
        findContract(MockModelSuccess, {});

        // Expect
        expect(execSpy).toBeCalledTimes(1);
    });
});