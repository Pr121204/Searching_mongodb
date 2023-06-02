const { MongoClient } = require('mongodb');
const campaignsData = require('./S_campaigns.json');

const uri = 'mongodb+srv://priyanshichaturvedi88:udd5c8RgpM7jb2Xr@cluster0.jnzm7hy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function uploadCampaigns() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db('test'); 
    const collection = database.collection('campaigns');
    
    const result = await collection.insertMany(campaignsData);
    console.log(`${result.insertedCount} campaigns inserted successfully`);

    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

uploadCampaigns();
