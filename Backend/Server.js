import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDatabase from './config/mongodb.js'
import connectCloudinary from './config/Cloudinary.js'

//=============================================== App Config ========================================================

const app = express();
const port = process.env.PORT || 4000;
connectDatabase();
connectCloudinary();

//=============================================== Middleware ========================================================

app.use(express.json());
app.use(cors());

//=============================================== API End Point =====================================================

app.get('/', (req, res) => {
    res.send("API WORKING");
});

//=============================================== Server Start =====================================================

app.listen(port, () => console.log(`Server started on port ${port}`));
