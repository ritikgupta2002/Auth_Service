const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      //because this is a sensitive piece of info so we dont want it to come it through urls so we pass sesitive info through body .
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user ",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong ",
      data: {},
      success: false,
      err: error,
    });
  }
};
module.exports = {
  create,
};