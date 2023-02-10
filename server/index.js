import express from 'express';
import cors from 'cors';
import { fetchFromCSN, fetchFromUSGS } from './scrapers/index.js';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {

    try {
        const { date, source } = req.query;

        const newDate = new Date(`${date}T00:00`);

        const dateObject = newDate.toString() !== 'Invalid Date' ? newDate : new Date();

        const fetchSource = source !== 'usgs' ? fetchFromCSN : fetchFromUSGS;

        const results = await fetchSource(dateObject);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).send('There was an error')
    }

});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})