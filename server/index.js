import express from 'express';
import cors from 'cors';
import { fetchFromCSN, fetchFromUSGS } from './scrapers/index.js';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {

    const { date, source } = req.query;

    const dateObject = date ? new Date(`${date}T00:00`) : new Date();

    const fetchSource = !source || source === 'csn' ? fetchFromCSN : fetchFromUSGS;

    const results = await fetchSource(dateObject);

    res.json(results);

});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})