import assert from "assert";
import mongoose, { connect } from "mongoose";
import sinon from "sinon";
import { connectToLocalMongo } from "../src/mongoHelper.js";
import { MONGO_CONNECTION_STRING } from "../src/constants.js";

describe('MongoHelper tests', () => {
    it('should pass a simple test', () => {
        assert.equal(1, 1);
    });

    it('Should try to connect to MongoDB correctly', async () => {
        // When
        const stub = sinon.spy(connect);

        // Then
        await connectToLocalMongo();

        // Expect
        sinon.assert.called(stub);
    })
});