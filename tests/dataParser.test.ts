import path from "path";
import xlsx from 'node-xlsx';
import { FILE_NAME } from "../src/constants";
import { createTestFilePath, getDataFromLocalXLSX } from "../src/dataParser";
import { expectedParsedDataResult, parsedData } from "./testData/testData";

jest.mock('path');
jest.mock('node-xlsx');

describe('DataParser tests', () => {

    it('should slice the correct number of headers rows off in getDataFromLocalXLSX', async () => {
        // When
        const mockFilePath = 'C://dummy/fake/path/data.xlsx';
        path.join = jest.fn().mockImplementationOnce(() => mockFilePath);
        xlsx.parse = jest.fn().mockImplementationOnce(() => parsedData);

        // Then
        const result = await getDataFromLocalXLSX();

        // Expect
        expect(result).toEqual(expectedParsedDataResult);
    });

    // Not a lot can be tested from this funciton so lets just check that it maintains it's use of
    // the file name constant to ward off potential future changes violating Open/Closed.
    it('should create a proper string from createTestFilePath', () => {
        // When
        const mockPath = 'C://dummy/fake/path';
        path.dirname = jest.fn().mockImplementationOnce(() => mockPath);

        // Then
        createTestFilePath();

        // Expect
        expect(path.join).toBeCalledTimes(1);
        expect(path.join).toBeCalledWith(mockPath, 'static', FILE_NAME);
    });
});