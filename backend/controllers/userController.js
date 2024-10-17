const User = require("../models/userModel");

const signupUser = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.send({
      message: "Email id is already registered",
      alert: false,
    });
  } else {
    const newUser = new User(req.body);
    await newUser.save();
    return res.send({ message: "Successfully signed up", alert: true });
  }
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const dataSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };
    res.send({ message: "Login is successful", alert: true, data: dataSend });
  } else {
    res.send({
      message: "Email is not available, please sign up",
      alert: false,
    });
  }
};

module.exports = { signupUser, loginUser };
