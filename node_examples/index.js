const rect = require("./rectangle");

function solve_rectangle(l, b) {
  console.log(`l = ${l}, b = ${b}`);
  rect(l, b, (err, rectangle) => {
    if (err) {
      console.log(`Error: ${err.message}`);
    } else {
      console.log(
        `Area: ${rectangle.area()}, `, // No arguments becouse of closure
        `perimeter: ${rectangle.perimeter()}` // No arguments becouse of closure
      );
    }
  });
  console.log("Demonstrating delay");
}

solve_rectangle(12, 3);
solve_rectangle(-12, 3);
