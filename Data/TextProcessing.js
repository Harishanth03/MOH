import fs from 'fs';

// Load dataset
const rawData = fs.readFileSync("DataSet.json");
const dataset = JSON.parse(rawData);

// Function for text preprocessing (Meaningful Tokenization)
const preprocessText = (text) => {
    // Convert to lowercase
    text = text.toLowerCase();

    // Remove punctuation (e.g., .,!,?, etc.)
    text = text.replace(/[^\w\s]/g, "");

    // Tokenization (split into words by space)
    const tokens = text.split(" ");

    return tokens;
};

// Apply preprocessing to dataset
const processedData = dataset.map(item => ({
    command: item.command,
    endpoint: item.endpoint,
    tokens: preprocessText(item.command)
}));

// Save processed dataset
fs.writeFileSync("ProcessedData.json", JSON.stringify(processedData, null, 2));

console.log("✅ Text Preprocessing Complete! Processed data saved to 'ProcessedData.json'.");
