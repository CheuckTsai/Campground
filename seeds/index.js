const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const pics = require('./pics');
const comments = require('./comments');
const Campground = require('../models/campground');
const dbUrl = 'mongodb+srv://tsai:Lzc_451776740@Cluster0.si7xq.mongodb.net/Cluster0?retryWrites=true&w=majority'


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const random20_1 = Math.floor(Math.random() * 20);
        const random20_2 = Math.floor(Math.random() * 20);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6127caeaca82f20016a8c594',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                coordinates: [cities[random1000].longitude,
                cities[random1000].latitude,],
                type: 'Point'
            },
            images: [
                {
                    url: `${pics[random20_1]}`,
                    filename: `${pics[random20_1]}`
                },
                {
                    url: `${pics[random20_2]}`,
                    filename: `${pics[random20_2]}`
                }
            ],
            description: `${comments[random20_1]}`,
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
