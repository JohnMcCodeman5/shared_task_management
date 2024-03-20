const fs = require('fs');
const { MongoClient } = require('mongodb');


const jsonData = fs.readFileSync('./tasks.json');
const data = JSON.parse(jsonData);

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('local');
    const collection = database.collection('tasks');

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted`);
  } finally {
    await client.close();
  }
}

run().catch(console.error);