// Add diagnostics to your database connection

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'esnapup', // Explicitly specify the database name
      maxPoolSize: 50,   // Increase connection pool size
      socketTimeoutMS: 30000, // Increase socket timeout
      serverSelectionTimeoutMS: 5000 // Increase server selection timeout
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Using database: ${conn.connection.name}`);
    
    // List all collections to verify what's in the database
    const collections = await conn.connection.db.collections();
    console.log('Available collections:');
    for (let collection of collections) {
      console.log(`- ${collection.collectionName}`);
      // Count documents in each collection
      const count = await conn.connection.db.collection(collection.collectionName).countDocuments();
      console.log(`  Documents: ${count}`);
    }
    
    return conn;
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;