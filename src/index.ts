import { getDataFromLocalXLSX } from './dataParser.js';
import { catchAndSaveGenericError } from './errorManager.js';
import { closeConnection, connectToLocalMongo, createAndSaveContract, createAndSaveTrack, createSchemaModels } from './mongoHelper.js';
import { parseTrackRows } from './objectMapper.js';

main();

export async function main() {
    await connectToLocalMongo();

    createSchemaModels();

    await createAndSaveContract({
        Name: 'Contract 1'
    });

    const trackData = await getDataFromLocalXLSX();
    
    const trackObjects = await parseTrackRows(trackData);

    await Promise.all(trackObjects.map(createAndSaveTrack))
    .catch(catchAndSaveGenericError);

    await closeConnection();
};


