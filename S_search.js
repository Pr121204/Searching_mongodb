const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://priyanshichaturvedi88:udd5c8RgpM7jb2Xr@cluster0.jnzm7hy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Serve the frontend HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Define the API endpoint for campaign search
app.get('/search', async (req, res) => {
  try {
    const campaignName = req.query.campaignName; // Retrieve the campaign name from the query parameter

    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db('test'); 
    const collection = database.collection('campaigns');
    
    // Search for campaigns matching the campaign name
    const searchResults = await collection.find({ campaignName: { $regex: campaignName, $options: 'i' } }).toArray();

    await client.close();
    console.log('Disconnected from MongoDB Atlas');
    
    res.json(searchResults); // Return the search results as a JSON response
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
