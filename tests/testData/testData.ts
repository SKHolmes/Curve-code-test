export const data1Track = ['data1-1','data1-2','data1-3','data1-4','data1-5','data1-6','data1-7','data1-8'];
export const data2Track = ['data2-1','data2-2','data2-3','data2-4','data2-5','data2-6', 'data2-7', 'data2-8'];
export const data3Track = ['data3-1','data3-2','data3-3','data3-4','data3-5','data3-6', 'data3-7', 'data3-8'];
export const noContractTrack = ['data4-1','data4-2','data4-3','data4-4','data4-5','data4-6', 'data4-7', ''];
export const noTitleTrack = ['data5-1', '','data5-3','data5-4','data5-5','data5-6', 'data5-7', 'data5-8'];
export const noISRCTrack = ['data6-1', 'data6-2','data6-3','data6-4', '','data6-6', 'data6-7', 'data6-8'];

export const parsedData = [
    { 
        data: [
            ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5', 'Header 6', 'Header 7', 'Header 8'],
            ['Subheader 1', 'Subheader 2', 'Subheader 3', 'Subheader 4', 'Subheader 5', 'Subheader 6', 'Subheader 7', 'Subheader 8'],
            data1Track,
            data2Track,
            data3Track
        ]
    },
];

export const expectedParsedDataResult = [data1Track, data2Track, data3Track];

export const expectedData1TrackParseSuccessResult = { "Aliases": ["data1-7"], 
    "Artist": "data1-4", 
    "Contract ID": "123", 
    "ISRC": "data15", 
    "P Line": "data1-6", 
    "Title": "data1-2", 
    "Version": "data1-3", 
    "_id": "data1-1"
};

export const expectedNoContractResult = { "Aliases": ["data4-7"], 
    "Artist": "data4-4", 
    "ISRC": "data45", 
    "P Line": "data4-6", 
    "Title": "data4-2", 
    "Version": "data4-3", 
    "_id": "data4-1"
};

export const expectedParseTracksSuccessResult = [
    {"Aliases": ["data1-7"], "Artist": "data1-4", "Contract ID": "123", "ISRC": "data15", "P Line": "data1-6", "Title": "data1-2", "Version": "data1-3", "_id": "data1-1"}, 
    {"Aliases": ["data2-7"], "Artist": "data2-4", "Contract ID": "123", "ISRC": "data25", "P Line": "data2-6", "Title": "data2-2", "Version": "data2-3", "_id": "data2-1"}, 
    {"Aliases": ["data3-7"], "Artist": "data3-4", "Contract ID": "123", "ISRC": "data35", "P Line": "data3-6", "Title": "data3-2", "Version": "data3-3", "_id": "data3-1"}
];

export const expectedParseTracksPartialSuccessResult = [
    {"Aliases": ["data1-7"], "Artist": "data1-4", "Contract ID": "123", "ISRC": "data15", "P Line": "data1-6", "Title": "data1-2", "Version": "data1-3", "_id": "data1-1"}, 
    {"Aliases": ["data3-7"], "Artist": "data3-4", "Contract ID": "123", "ISRC": "data35", "P Line": "data3-6", "Title": "data3-2", "Version": "data3-3", "_id": "data3-1"}
];