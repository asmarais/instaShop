const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;
//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connection to database"))
  .catch((err) => console.log(err));

//user schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});
const userModel = mongoose.model("user", userSchema);

//api

app.get("/", (req, res) => {
  res.send("Server is running");
});

//signup api
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  // Find if the email is already registered
  const existingUser = await userModel.findOne({ email: email });

  if (existingUser) {
    // If email exists, send a message
    return res.send({
      message: "Email id is already registered",
      alert: false,
    });
  } else {
    // If email doesn't exist, save the new user
    const newUser = new userModel(req.body);
    await newUser.save();
    return res.send({ message: "Successfully signed up", alert: true });
  }
});

//login api
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  // Find the user by email using async/wait
  const result = await userModel.findOne({ email: email });

  if (result) {
    // Prepare the data to send back
    const dataSend = {
      _id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      image: result.image,
    };
    console.log(dataSend);

    // Send successful login response
    res.send({
      message: "Login is successful",
      alert: true,
      data: dataSend,
    });
  } else {
    // Send response if user is not found
    res.send({
      message: "Email is not available, please sign up",
      alert: false,
    });
  }
});

//product schema
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//add product api
app.post("/uploadProduct", async (req, res) => {
  console.log(req.body);
  const data = productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload successfully" });
});

app.listen(PORT, () => console.log("server is running at port : " + PORT));

//get all products
app.get("/product", async (req, res) => {
  const data = await productModel.find({});

  res.send(JSON.stringify(data));
});
