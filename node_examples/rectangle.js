module.exports = (x, y, cb) => {
  if (x <= 0 || y <= 0) {
    setTimeout(
      () =>
        cb(
          new Error(`Incorrect rectangle dimensions: l = ${x}, b = ${y}`),
          null
        ),
      2000
    ); // emulating long computation process
  } else {
    setTimeout(
      () =>
        cb(null, {
          perimeter: () => 2 * (x + y), // No arguments becouse of closure
          area: () => x * y // No arguments becouse of closure
        }),
      2000
    ); // emulating long computation process
  }
};
