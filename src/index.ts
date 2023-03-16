import { getDataFromLocalXLSX } from './dataParser.js';
import { catchAndSaveGenericError, printErrors } from './errorManager.js';
import { closeConnection, connectToLocalMongo, createAndSaveModel, createSchemaModels } from './mongoHelper.js';
import { parseTrackRows } from './objectMapper.js';

main();

export async function main() {
    await connectToLocalMongo();

    const { Contract, Track } = createSchemaModels();

    await createAndSaveModel(Contract, {
        Name: 'Contract 1'
    });

    const trackData = await getDataFromLocalXLSX();
    
    const trackObjects = await parseTrackRows(trackData, Contract);

    await Promise.all(trackObjects.map((trackObject) => {
        return createAndSaveModel(Track, trackObject);
    }))
    .catch(catchAndSaveGenericError);

    await closeConnection();

    printErrors();
};


