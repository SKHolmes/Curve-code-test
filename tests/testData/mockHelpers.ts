import mongoose from "mongoose";

export const successConstructorSpy = jest.fn();
export const successSaveSpy = jest.fn().mockImplementation(() => Promise.resolve());
export const execSpy = jest.fn().mockImplementation(() => Promise.resolve({_id: '123'}));
export const MockModelSuccess = class {
    constructor(data: any) {
        successConstructorSpy(data);
    }

    save = successSaveSpy;

    static findOne() {
        return { exec: execSpy};
    }
} as unknown as mongoose.Model<any>;

export const failureConstructorSpy = jest.fn();
export const mockError = new Error("Something went wrong :(")
export const failSaveSpy = jest.fn().mockRejectedValue(mockError);
export const execUndefinedSpy = jest.fn().mockImplementation(() => Promise.resolve(undefined));

export const MockModelFail = class {
    constructor(data: any) {
        failureConstructorSpy(data);
    }

    save = failSaveSpy;

    static findOne() {
        return { exec: execUndefinedSpy};
    }
} as unknown as mongoose.Model<any>;
