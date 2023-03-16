import mongoose from "mongoose";
import { errors } from "../src/errorManager";
import { parseAliases, parseISRC, parseTrack, parseTrackRows } from "../src/objectMapper";
import { execSpy, MockModelFail, MockModelSuccess } from "./testData/mockHelpers";
import { data1Track, data2Track, data3Track, expectedData1TrackParseSuccessResult, expectedNoContractResult, expectedParseTracksPartialSuccessResult, expectedParseTracksSuccessResult, noContractTrack, noISRCTrack, noTitleTrack } from "./testData/testData";

jest.mock('mongoose');

describe('ObjectMapper tests', () => {

    afterEach(() => {
        errors.length = 0;
    });

    it('should parse aliases correctly', () => {
        // When
        const aliases = 'alias1;alias2;alias3';
        const expectedResult = ['alias1', 'alias2', 'alias3'];

        // Then
        const result = parseAliases(aliases);

        // Expect
        expect(result).toEqual(expectedResult);
    });

    it('should avoid adding empty aliases when duplicate semicolons are stacked in the string', () => {
            // When
            const aliases = ';;alias1;;alias2;;;;alias3;';
            const expectedResult = ['alias1', 'alias2', 'alias3'];
    
            // Then
            const result = parseAliases(aliases);
    
            // Expect
            expect(result).toEqual(expectedResult);
    });

    it('should parseTrack correctly', async () => {
        // When

        // Then
        const result = await parseTrack(data1Track, 0, MockModelSuccess);

        // Expect
        expect(result).toEqual(expectedData1TrackParseSuccessResult);
    });

    it('should add errors to the errors array if the contract listed does not exist in mongo', async () => {
        // When
        const expectedErrorsArray = [{
            errorMessage: 'Track row 1, no contract exists with contract name data1-8.',
            row: 1
        }]

        // Then
        const result = await parseTrack(data1Track, 0, MockModelFail);

        // Expect
        expect(errors).toEqual(expectedErrorsArray);
        expect(result).toBe(undefined);
    });

    it('should not call any contract model functions if there is no contract data', async () => {
        // When

        // Then
        const result = await parseTrack(noContractTrack, 0, MockModelSuccess);

        // Expect
        expect(result).toEqual(expectedNoContractResult);
        expect(execSpy).toBeCalledTimes(0);
    });

    it('should add an error to the array and return undefined if there is no track title', async () => {
        // When
        const expectedErrorsArray = [{
            errorMessage: 'Track on row 2 has no title.',
            row: 2
        }];

        // Then
        const result = await parseTrack(noTitleTrack, 1, MockModelSuccess);

        // Expect
        expect(errors).toEqual(expectedErrorsArray);
        expect(result).toBe(undefined);
    });

    it('should add an error to the array and return undefined if there is no isrc', async () => {
        // When
        const expectedErrorsArray = [{
            errorMessage: 'Track on row 6 has no ISRC.',
            row: 6
        }];

        // Then
        const result = await parseTrack(noISRCTrack, 5, MockModelSuccess);

        // Expect
        expect(errors).toEqual(expectedErrorsArray);
        expect(result).toBe(undefined);
    });

    it('should parse ISRC into correct alphanumeric results', () => {
        // When
        const isrc = 'BAC-123_/hkj';
        const expectedResult = 'BAC123hkj';

        // Then
        const result = parseISRC(isrc);

        // Expect
        expect(result).toEqual(expectedResult);
    });

    it('should successfully parse normal track data', async () => {
        // When
        const tracks = [data1Track, data2Track, data3Track];

        // Then
        const result = await parseTrackRows(tracks, MockModelSuccess);

        expect(result).toEqual(expectedParseTracksSuccessResult);
    });

    it('should successfully parse some normal track data and list errors of bad tracks', async () => {
        // When
        const tracks = [data1Track, noISRCTrack, data3Track];
        const expectedErrorsArray = [{
            errorMessage: 'Track on row 2 has no ISRC.',
            row: 2
        }];

        // Then
        const result = await parseTrackRows(tracks, MockModelSuccess);

        expect(result).toEqual(expectedParseTracksPartialSuccessResult);
        expect(errors).toEqual(expectedErrorsArray);
    });
});