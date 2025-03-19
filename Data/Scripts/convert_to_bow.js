import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path (Fix for ES Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load processed dataset
const dataPath = path.resolve(__dirname, '../data/ProcessedData.json');
if (!fs.existsSync(dataPath)) {
    console.error(`ERROR: File not found at ${dataPath}`);
    process.exit(1);
}

const rawData = fs.readFileSync(dataPath);
const processedData = JSON.parse(rawData);

// Count word frequency
const wordCount = {};
processedData.forEach(item => {
    item.tokens.forEach(token => {
        wordCount[token] = (wordCount[token] || 0) + 1;
    });
});

// **Keep Only the Top 100 Most Common Words**
const vocabArray = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency (most used words first)
    .slice(0, 100) // Keep top 100 words
    .map(item => item[0]); // Extract words

// Step 2: Convert Sentences into Optimized BoW Vectors
const convertToBoW = (tokens) => vocabArray.map(word => tokens.includes(word) ? 1 : 0);

// Step 3: Generate BoW Representations
const bowData = processedData.map(item => ({
    command: item.command,
    endpoint: item.endpoint,
    bow_vector: convertToBoW(item.tokens)
}));

// Save BoW dataset
const outputPath = path.resolve(__dirname, '../data/BoWData.json');
fs.writeFileSync(outputPath, JSON.stringify(bowData, null, 2));

console.log(`Optimized BoW Conversion Complete! Data saved to '${outputPath}'`);
console.log(`Vocabulary size reduced to ${vocabArray.length} words.`);
