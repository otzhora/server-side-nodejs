const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then(db => {
  console.log("Connnected to db");

  let newDish = Dishes({
    name: "Pizza",
    description: "Pan raas"
  });

  newDish
    .save()
    .then(dish => {
      console.log(dish);
      return Dishes.find({}).exec();
    })
    .then(dishes => {
      console.log(dishes);
      return Dishes.deleteMany({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch(console.log);
});
