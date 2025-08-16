const { scanDirectory } = require('./refactor');

function main() {
    const pathToCode = process.argv[2];
    if (!pathToCode) {
        console.error('Please provide a path to the code.');
        process.exit(1);
    }

    // Run scan
    const results = scanDirectory(pathToCode);
    // Handle results here
}

main();