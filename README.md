# How to:

First be sure to change the constants.ts file to use a local mongodb instance of your choosing, changing MONGO_CONNECTION_STRING to your own connection string. Then run the following commands

1. npm install
2. npm run build
3. npm run dev

### Caveats:

There are plenty of ways which I could set up the program to ingest the xlsx data and even more ways I could make it more robust (i.e, consume multiple files, auto-handle xlsx headers.) But in order to keep it simple it simply consume the file from the static directory.

If you want to test different xlsx files simply add them to the src/static directory and run **npm run build** or **npm run copy-files**, the latter of which will be faster. The copy files step will copy all .xlsx fiels across to the transpiled dist directory where the app runs to make it easier to locate .xlsx files. Make sure to change the name of the file you want to test in the *constants.ts* file and rebuild if you want to test a xlsx file under a different name.

Also I am not MongoDB expert, I would expect there are best practices that I have missed and mistakes I have made in executing mongodb commands. This project is now the most exposure I have had in a single repo

### Tests:

To run tests run **npm run test**. Tests are transpiled and run from their .js forms because I couldn't for the life of me get ts-jest to play nice with the latest version of Typescript, (oddly enough a merge request to the Typescript github to fix the error I was getting has been approved, simply not released yet.) Coverage will be printed to screen as well as into the /coverage directory.

### Improvements:

There are always multiple ways to go about improving the functionality of a piece of work like this given enough time and resources but the obvious one is refactoring. As I was writing the code I was renaming and moving files around in the file structure, meddling with my tsconfig and grouping code snippets with similar responsibilities into separate files. In a lot of places in the code I have written comments about thoughts I have had about improving the code given more time.
