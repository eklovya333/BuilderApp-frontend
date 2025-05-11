require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const auth = require("./middleware/auth");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
    console.log("inside registry");
    try{
        const { firstName, lastName, email, password } = req.body;

        if (!(firstName && lastName && email && password))
            return res.status(400).send("All inputs are required!!");

        const oldUser = await User.findOne({email});

        if(oldUser)
            return res.status(401).send("User exists already");

        encryptedPasswd = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(), // sanitize
            password: encryptedPasswd,
          });

          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "5h",
            }
          );

          user.token = token;

          return res.status(201).json(user);
        } catch (err) {
          console.log(err);
        }
    }
  )

  app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome to FreeCodeCamp 🙌");
  });

  app.post("/login", async (req, res) => {
    console.log("inside login");

    // Our login logic starts here
     try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        return res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        return res.status(200).json(user);
      }

  }      catch (err) {
    return res.status(400).send("Invalid Credentials");
}
  }
);