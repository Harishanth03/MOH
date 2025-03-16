import fs from 'fs';
import natural from 'natural';
import WordPOS from 'wordpos'; // ✅ Correct import

// Initialize tokenizer & lemmatizer
const tokenizer = new natural.WordTokenizer();
const wordpos = new WordPOS();  // ✅ Correct initialization

// Load dataset
const rawData = fs.readFileSync("DataSet.json");  // ✅ Read dataset only once
const dataSet = JSON.parse(rawData);  // ✅ Parse JSON correctly

// Stopwords list
const stopwords = new Set(["to", "the", "is", "on", "for", "a", "an", "in", "at", "and", "or", "please", "my", "i", "me", "can", "you", "with"]);

// Function for text preprocessing
const preprocessText = async (text) => {
    text = text.toLowerCase();  // Convert to lowercase
    text = text.replace(/[^\w\s]/g, "");  // Remove punctuation
    let tokens = tokenizer.tokenize(text);  // Tokenize text into words

    // Remove stopwords
    tokens = tokens.filter(word => !stopwords.has(word));

    // Apply lemmatization
    const lemmatizedTokens = await Promise.all(tokens.map(word => wordpos.lookup(word).then(result => {
        return result.length > 0 ? result[0].lemma : word; // ✅ Keep lemma if available
    })));

    return lemmatizedTokens;
};

// Apply preprocessing to dataset
const processDataset = async () => {
    const processedData = await Promise.all(dataSet.map(async item => ({ // ✅ Fixed `dataset` → `dataSet`
        command: item.command,
        endpoint: item.endpoint,
        tokens: await preprocessText(item.command)
    })));

    // Save processed dataset
    fs.writeFileSync("ProcessedData.json", JSON.stringify(processedData, null, 2));
    console.log("✅ Text Preprocessing Complete! Processed data saved to 'ProcessedData.json'.");
};

// Run preprocessing
processDataset();
