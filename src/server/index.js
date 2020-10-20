const axios = require("axios");
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv");

// 0. Load ENV variables including cloud KEY
dotenv.config();
const API_KEY = process.env.API_KEY;
const API_URL = `https://api.meaningcloud.com/sentiment-2.1`;

if (!API_KEY) {
    throw 'Missing API KEY, check if you have .env';
}

// 1. Setup
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

// 2. Define routers
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/parse', function (req, res) {
    const q = req.body.q.trim();    
    const params = {
      key: API_KEY,
      lang: "en",
      txt: q
    };

    axios({
        url: API_URL,
        method: "post",
        params: params,
      })
    .then((response) => {
        res.status(200).json(response.data);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
})


// 3. Start server
const apiPort = 8081
app.listen(apiPort, function () {
    console.log(`NLP API listerning on ${apiPort}`)
})
