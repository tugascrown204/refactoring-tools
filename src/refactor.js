const fs = require('fs');
const path = require('path');

// Function to scan for code smells in a file
function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const smells = [];

    // Example logic for detecting a code smell
    if (content.includes('console.log')) {
        smells.push('Code Smell Detected: Use of console.log');
    }

    return smells;
}

// Function to scan a directory for files
function scanDirectory(directoryPath) {
    let results = [];
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results = results.concat(scanDirectory(filePath));
        } else if (file.endsWith('.js')) {
            results = results.concat(scanFile(filePath));
        }
    });

    return results;
}

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.log('Usage: node refactor.js <path-to-your-code>');
    process.exit(1);
}

const pathToCode = args[0];
const results = scanDirectory(pathToCode);

if (results.length > 0) {
    console.log('Code Smells Found:');
    results.forEach(smell => console.log(smell));
} else {
    console.log('No code smells found.');
}
