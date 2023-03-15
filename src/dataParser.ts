import path from "path";
import xlsx from 'node-xlsx';
import { fileURLToPath } from "url";
import { FILE_NAME } from "./constants.js";

/**
 * A hardcoded method which will extract the data from the test xlsx file. This method
 * will strip the first two lines as header lines from the XLSX. In order to avoid future problems where
 * this method may be mis-reused it is tightly coupled to the createTestFilePath method which ONLY
 * returns the test file path. Any additional parsing required in the future should follow the Open-Closed
 * principle and should be added to this dataParser file and not modify these methods.
 * @returns The data from the file as an array of rows excluding the first two header rows.
 */
export const getDataFromLocalXLSX = async () => {
    const testFile = xlsx.parse(createTestFilePath());
    console.log(testFile[0].data)
    return testFile[0].data.slice(2) as string[][];
};

/**
 * A helper method which will take the currently executing path and return an absolute file path 
 * for the FILE_NAME file out of the static dist directory.
 * @returns The test file path as a string
 */
export const createTestFilePath = (): string => {
    const metaUrl = import.meta.url;
    const pathUrl = fileURLToPath(metaUrl);
    const dirName = path.dirname(pathUrl);
    const testFilePath = path.join(dirName, 'static', FILE_NAME);
    return testFilePath;
};