import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import natural from 'natural';
import WordPOS from 'wordpos'; // WordNet Lemmatizer

// Get directory name equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct dataset path based on your folder structure
const dataPath = path.resolve(__dirname, '../data/DataSet.json'); 

// Check if file exists
if (!fs.existsSync(dataPath)) {
    console.error(`❌ ERROR: File not found at ${dataPath}`);
    process.exit(1); // Stop execution if file is missing
}

// Read dataset
const rawData = fs.readFileSync(dataPath);
const dataSet = JSON.parse(rawData);

// Initialize tokenizer & lemmatizer
const tokenizer = new natural.WordTokenizer();
const wordpos = new WordPOS();

// Stopwords list
const stopwords = new Set(["to", "the", "is", "on", "for", "a", "an", "in", "at", "and", "or", "please", "my", "i", "me", "can", "you", "with"]);

// Function for text preprocessing
const preprocessText = async (text) => {
    text = text.toLowerCase();
    text = text.replace(/[^\w\s]/g, "");
    let tokens = tokenizer.tokenize(text);

    // Remove stopwords
    tokens = tokens.filter(word => !stopwords.has(word));

    // Apply lemmatization
    const lemmatizedTokens = await Promise.all(tokens.map(word => wordpos.lookup(word).then(result => {
        return result.length > 0 ? result[0].lemma : word;
    })));

    return lemmatizedTokens;
};

// Apply preprocessing to dataset
const processDataset = async () => {
    const processedData = await Promise.all(dataSet.map(async item => ({
        command: item.command,
        endpoint: item.endpoint,
        tokens: await preprocessText(item.command)
    })));

    // Save processed dataset in `data` folder
    const outputPath = path.resolve(__dirname, '../data/ProcessedData.json');
    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));
    console.log(`✅ Text Processing Complete! Data saved to '${outputPath}'`);
};

// Run preprocessing
processDataset();
