import printFunction from '@elsamplio/package-test';
import express from 'express';
import redisClient from './redis-client.js'
const app = express();

app.get('/', (req, res) => {
    return res.send('Hello world');
});

app.get('/store/:key', async (req, res) => {
    const { key } = req.params;
    const value = req.query;
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.send('Success');
});
app.get('/:key', async (req, res) => {
    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.json(JSON.parse(rawData));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    printFunction();
    console.log(`Server listening on port ${PORT}`);
});