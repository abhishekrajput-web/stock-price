// import express from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import cors from "cors";
// const app = express();
// // initialise downlaoded package
// app.use(cors());
// // app.use(express.json());
// // app.use(bodyParser.urlencoded({extended:true}));

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// dotenv.config();

// import databaseConnection from "./connection/connection.js";
// import authRoute from "./routes/authRoute.js";
// import otpRoute from "./routes/otpRoute.js";


// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/otp", otpRoute);


// app.get("/", (req, res) =>{
//     res.send("server is running successfully");
// });
    
// const startServer = async () =>{
// try {
//     databaseConnection(process.env.MONGODB_URI);
//     app.listen(process.env.PORT, () =>{
//         console.log(`server is successfully running on PORT ${process.env.PORT}`)
//     });
    
// } catch (error) {
//     console.log(error || "Error In Starting Server");
// }

// }

// startServer();




import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
dotenv.config();

// Set up __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape-etf', async (req, res) => {
    try {
        // Initial request to get cookies and tokens
        let initialResponse = await axios.get(process.env.ETF_HOME_PAGE, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });

        let cookies = initialResponse.headers['set-cookie'];

        // Fetch data from the NSE India ETF API
        const response = await axios.get(process.env.ETF_STOCK_DETAIL_API, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept': 'application/json',
                'Referer': 'https://www.nseindia.com/market-data/exchange-traded-funds-etf',
                'Cookie': cookies.join('; ')
            }
        });

        const etfData = response.data;

        // Define the file path where the data will be saved
        const filePath = path.join(__dirname, 'etfData.json');

        // Save the data to a file
        fs.writeFile(filePath, JSON.stringify(etfData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).send('Error saving the data');
            }
            console.log('Data saved successfully');
            res.send('Data scraped and saved successfully');
        });
    } catch (error) {
        console.error('Error fetching data from the API', error);
        res.status(500).send('Error fetching data from the API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});