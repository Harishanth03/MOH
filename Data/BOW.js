import fs from 'fs';

// Load processed dataset
const rawData = fs.readFileSync("ProcessedData.json");
const processedData = JSON.parse(rawData);

// Count word frequency
const wordCount = {};
processedData.forEach(item => {
    item.tokens.forEach(token => {
        wordCount[token] = (wordCount[token] || 0) + 1;
    });
});

// Keep only the 100 most common words
const vocabArray = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency
    .slice(0, 100) // Keep only top 100
    .map(item => item[0]); // Get word list

// Convert Sentences into BoW Vectors
const convertToBoW = (tokens) => vocabArray.map(word => tokens.includes(word) ? 1 : 0);

// Generate BoW Representations
const bowData = processedData.map(item => ({
    command: item.command,
    endpoint: item.endpoint,
    bow_vector: convertToBoW(item.tokens)
}));

// Save BoW dataset
fs.writeFileSync("BoWData.json", JSON.stringify(bowData, null, 2));
console.log("✅ BoW Conversion Complete! Data saved to 'BoWData.json'.");
