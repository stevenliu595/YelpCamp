const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:127.0.0.1/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected to database");
});

//get random element from an array
const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //should be my user id
      author: "61db5d2877ca7d9cb9d0e7be",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam esse ipsum libero, corporis in, quia ratione corrupti, et voluptate quae ducimus aperiam illo animi mollitia tempora a obcaecati labore molestiae. ",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dfcg012t5/image/upload/v1641945485/YelpCamp/krho9opjyc5nxl40pps.jpg",
          filename: "YelpCamp/krho9opjyc5nxl40pps",
        },
        {
          url: "https://res.cloudinary.com/dfcg012t5/image/upload/v1641945485/YelpCamp/yjd44wplnkwskf5eigqe.jpg",
          filename: "YelpCamp/yjd44wplnkwskf5eigqe",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
