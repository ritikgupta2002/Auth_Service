const { User } = require("../models/index");

class UserRepository {
  async create(data) {
    //create the instance
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong on repository layer ");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destroy({
        //delete the instance
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.log("something went wrong on repository layer ");
      throw error;
    }
  }
}

module.exports = UserRepository;
