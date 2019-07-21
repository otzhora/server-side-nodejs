const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then(db => {
  console.log("Connnected to db");

  Dishes.create({
    name: "Pizza",
    description: "Pan raas"
  })
    .then(dish => {
      console.log(dish);
      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "Pan massala" }
        },
        { new: true }
      ).exec();
    })
    .then(dish => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: "Great sas",
        author: "John"
      });
      return dish.save();
    })
    .then(dish => {
      console.log(dish);
      return Dishes.deleteMany({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch(console.log);
});
