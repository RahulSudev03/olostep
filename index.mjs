import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const API_KEY = 'olostep_headstarter_api_Cco42mZirSwlh7OZJ5Cewe28HEk3q'; // Replace <YOUR_API_KEY> with your Olostep API key

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>Olostep Web Scraper</h1>
        <form action="/scrape" method="post">
            <label for="url">URL to Scrape:</label>
            <input type="text" id="url" name="url_to_scrape" required>
            <button type="submit">Scrape</button>
        </form>
    `);
});

app.post('/scrape', async (req, res) => {
    const url_to_scrape = req.body.url_to_scrape;
    console.log(`Scraping URL: ${url_to_scrape}`);

    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + API_KEY,
        }
    };

    try {
        const response = await fetch('https://agent.olostep.com/olostep-p2p-incomingAPI?' + new URLSearchParams({
            "url_to_scrape": url_to_scrape
        }), options);
        const data = await response.json();
        console.log('Scraped Data:', data);

        res.send(`
            <h2>Scraped Data</h2>
            <pre>${JSON.stringify(data, null, 2)}</pre>
            <a href="/">Go Back</a>
        `);
    } catch (err) {
        console.error('Error during scraping:', err);
        res.send(`
            <h2>Error during scraping</h2>
            <pre>${err}</pre>
            <a href="/">Go Back</a>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
