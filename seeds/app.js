const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log('database connected')
})

const sample = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 40);
        const camp = new Campground({
            author: '60c705b5e31f887c3a3fec34',
            location: `${cities[random].city}, ${cities[random].state}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random].longitude, cities[random].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                    url: 'https://res.cloudinary.com/winged/image/upload/v1623747617/yelpcamp/pkpydxyyhfffk89xyktz.jpg',
                    filename: 'yelpcamp/pkpydxyyhfffk89xyktz'
                },
                {

                    url: 'https://res.cloudinary.com/winged/image/upload/v1623747619/yelpcamp/dei9x9svm0kgmjlg9zyb.jpg',
                    filename: 'yelpcamp/dei9x9svm0kgmjlg9zyb'
                },
                {
                    url: 'https://res.cloudinary.com/winged/image/upload/v1623747621/yelpcamp/awtlfetbc05yvkdmjldl.jpg',
                    filename: 'yelpcamp/awtlfetbc05yvkdmjldl'
                }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione temporibus consequatur, minima, alias deserunt perferendis ad ab assumenda tempora sunt laborum autem? Fuga odit repudiandae voluptatem officia excepturi aperiam voluptate!',
            price
        })
        await camp.save()
    }
}
seedDB()