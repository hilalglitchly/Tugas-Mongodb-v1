const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const mongoHost = process.env.MONGO_HOST || "mongo";
const mongoUser = process.env.MONGO_USER || "admin";
const mongoPassword = process.env.MONGO_PASSWORD || "password";

const uri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:27017/?authSource=admin`;

app.get('/health', (req, res) => {
    res.json({ status: "API running" });
});

app.get('/test-db', async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db("testdb");
        const result = await db.collection("test").insertOne({ message: "Connection OK" });

        res.json({ success: true, inserted_id: result.insertedId });

        await client.close();
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
