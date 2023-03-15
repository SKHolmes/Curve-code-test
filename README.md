# How to:

First be sure to change the constants.ts file to use a local mongodb instance of your choosing, changing MONGO_CONNECTION_STRING to your own connection string. Then run the following commands

1. npm install
3. npm run build
4. npm run dev

### Caveats:

There are plenty of ways which I could set up the program to ingest the xlsx data and even mre ways I could make it more robust (i.e, consume multiple files, auto-handle xlsx headers.) But in order to keep it simple it simply consume the file from the static directory.

If you want to test different xlsx files you will have overwrite and use the same name as "Track Import Test.xlsx" this shortcoming is due to the copyfiles step of the build targets that file name specifically and I simple don't have enough time to build out more robust functionality.

### Tests:

Sadly I didn't get to many/any tests. I normally use Jest and was unable to learn the ropes of Mocha/Chai/Sinon in time. I ended up spending an hour trying to figure out how best Sinon would go about mocking mongoose but only ended up pulling hair out! Apologies for this as I am big on testing and let myself down due to time constraint. It didn't stop me form developing in a TDD way however, as you will see throughout the code, every function is exported so tests can be formed in a piecemeal-unit testing fashion.

### Improvements:

There are always multiple ways to go about improving the functionality of a piece of work like this given enough time and resources but the obvious one is refactoring. As I was writing the code I was renaming and moving files around in the file structure, meddling with my tsconfig and grouping code snippets with similar responsibilities into separate files.
