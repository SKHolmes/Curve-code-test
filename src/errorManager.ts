const errors: GenericError[] = [];

interface GenericError {
    errorMessage: any,
    row?: number
}

/**
 * Print the error header log.
 */
export const printErrors = () => {
    console.log(`Found ${errors.length} error${errors.length === 1 ? '' : 's'}`);
    errors.forEach(prettyPrintError);
};

/**
 * Pretty prints out each error displaying in what order the errors came in
 * @param error The error to print
 */
export const prettyPrintError = (error: GenericError, index: number) => {
    console.log(`********** Error ${index + 1} **********`);
    console.log(error.errorMessage);
};

export const catchAndSaveGenericError = (error: any) => {
    errors.push({ errorMessage: error });
};

export const catchAndSaveRowParseError = (error: any, row: number) => {
    errors.push({ errorMessage: error, row });
};