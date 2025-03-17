import fs from 'fs';
import natural from 'natural';
import WordPOS from 'wordpos'; // WordNet Lemmatizer

// Initialize tokenizer & lemmatizer
const tokenizer = new natural.WordTokenizer();
const wordpos = new WordPOS();

// Load dataset
const rawData = fs.readFileSync("data/DataSet.json");
const dataSet = JSON.parse(rawData);

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

    // Save processed dataset
    fs.writeFileSync("data/ProcessedData.json", JSON.stringify(processedData, null, 2));
    console.log("✅ Text Processing Complete! Data saved to 'data/ProcessedData.json'.");
};

// Run preprocessing
processDataset();
