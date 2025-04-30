// Create this new file to list all collections in your database

require('dotenv').config();
const { MongoClient } = require('mongodb');

async function listCollections() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('esnapup');
    console.log('Database:', db.databaseName);
    
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections:`);
    
    for (const collection of collections) {
      console.log(`- ${collection.name} (type: ${collection.type})`);
      
      // Count documents in each collection
      const count = await db.collection(collection.name).countDocuments();
      console.log(`  ${count} documents`);
      
      // Sample a few documents from each collection
      if (count > 0) {
        const docs = await db.collection(collection.name).find().limit(2).toArray();
        console.log(`  Sample documents: ${JSON.stringify(docs, null, 2)}`);
      }
    }
  } catch (error) {
    console.error('Error listing collections:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

listCollections().catch(console.error);