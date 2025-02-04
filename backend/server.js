const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Zomato', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const db = mongoose.connection;
let restaurantsCollection;

db.once('open', () => {
    restaurantsCollection = db.collection('restaurant');
    console.log('Connected to restaurants collection');
});


app.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await restaurantsCollection.find().toArray();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants", error });
    }
});

app.get("/restaurants/:id", async (req, res) => {
    try {
        const restaurantID = parseInt(req.params.id);
        const restaurant = await restaurantsCollection.findOne({ "Restaurant ID": restaurantID });

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant", error });
    }
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
