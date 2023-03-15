import { catchAndSaveGenericError, catchAndSaveRowParseError } from "./errorManager.js";
import { findContract } from "./mongoHelper.js";

/**
 * This method will take a 2D array of track data rows and pass them all to the parseTrack method and await
 * the returned promises. In order to return a clean array of valid tracks to insert the undefined tracks are
 * filtered out before returning
 * @param trackData The 2D array containing track data rows
 * @returns An array of track schema valid objects to be inserted into the DB
 */
export const parseTrackRows = async (trackData: string[][]) => {
    const trackObjects = Promise.all(trackData.map(parseTrack));
    return (await trackObjects).filter(track => track !== undefined);
};

export const parseTrack = async (trackData: string[], index: number) => {
    // NB: This error message is causing issues when the contract name is not present as it is assuming
    // the end of the array is at index 6. This would require a lot of effort to fix in my opinion so I am 
    // leaving this commented out.
    
    // if (trackData.length !== 8) {
    //     catchAndSaveGenericError(`Track on row ${index + 1} has incorrect number of columns.`);
    //     return undefined;
    // }

    const trackId = trackData[0];
    const trackTitle = trackData[1];
    const trackVersion = trackData[2];
    const trackArtist = trackData[3];
    const trackISRC = parseISRC(trackData[4]);
    const trackPLine = trackData[5];
    const trackAliases = parseAliases(trackData[6]);

    let trackContractId;
    // If a contract name exists
    if (trackData[7]) {
        const contract = await findContract({ Name: trackData[7]});

        // If a valid contract is returned
        if (contract) {
            trackContractId = contract._id;
        } else {
            // If an find contract returns null for any other reason in the future it would be caught here as well.
            catchAndSaveRowParseError(`Track row ${index + 1}, no contract exists with contract name ${trackData[7]}.`, index + 1);
            return undefined;
        };
    };

    if (!trackTitle) {
        catchAndSaveRowParseError(`Track on row ${index + 1} has no title.`, index + 1);
        return undefined;
    };
    if (!trackISRC) {
        catchAndSaveRowParseError(`Track on row ${index + 1} has no ISRC.`, index + 1);
        return undefined;
    };

    return {
        ...(trackId && {_id: trackId}),
        Title: trackTitle,
        ...(trackVersion && {Version: trackVersion}),
        ...(trackArtist && {Artist: trackArtist}),
        ISRC: trackISRC,
        ...(trackPLine && {'P Line': trackPLine}),
        ...(trackAliases.length && {Aliases: trackAliases}),
        ...(trackContractId && {'Contract ID': trackContractId})
    }
};

/**
 * This method uses a regex to replace all non-alphanumeric characters with the empty string.
 * @param isrc The string to clean
 * @returns THe isrc without non-alphanumeric characters
 */
export const parseISRC = (isrc: string) => {
    return isrc.replace(/[^a-z0-9]/gi, '');
}

/**
 * This method will take a string of aliases and split it into separate strings on the ';' character
 * Special consideration is taken for the edge case where two ';' characters are next to each other to remove
 * any empty alias strings.
 * @param aliases The aliases to parse into separate strings
 * @returns The array of aliases split from the original string
 */
export const parseAliases = (aliases: string) => {
    const splitAliases = aliases.split(';')
    const trimmedAliases = splitAliases.map(e => e.trim());
    // On the off chance there is a typo and someone entered ';;' into the alias field we 
    // catch it here and remove it.
    return trimmedAliases.filter(alias => alias !== '');
}