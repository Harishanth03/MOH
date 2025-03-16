import fs from 'fs';

const rawData = fs.readFileSync("DataSet.json");

const dataset = JSON.parse(rawData);


const preprocessText = (text) => { //FUntion for tokenization

    text = text.toLowerCase();     // Convert to lowercase

    text = text.replace(/[^\w\s]/g, "");     // Remove punctuation (e.g., .,!,?, etc.)


    const tokens = text.split(" ");     // Tokenization (split into words by space)

    return tokens;
};


const processedData = dataset.map(item => ({ // Apply preprocessing to dataset
    command: item.command,
    endpoint: item.endpoint,
    tokens: preprocessText(item.command)
}));

fs.writeFileSync("ProcessedData.json", JSON.stringify(processedData, null, 2)); // Save processed dataset

console.log("Text Preprocessing Complete! Processed data saved to 'ProcessedData.json'."); 
