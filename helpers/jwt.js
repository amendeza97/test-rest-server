const jwt = require("jsonwebtoken");

const generate = async (uid = "") =>
  new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          return reject("Token no generated");
        }
        return resolve(token);
      }
    );
  });

module.exports = { generate };
