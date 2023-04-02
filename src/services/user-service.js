const UserRepository = require("../repository/user-repository");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      console.log("something went wrong at service layer ");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step1->fetch the user by email
      const user = await this.userRepository.getByEmail(email);
      //step2->compare incoming password with stored encrypted password
      const passwordsMatch = this.checkPassword(plainPassword, user.password);
      //step3->if passwords dont match
      if (!passwordsMatch) {
        console.log("Password don't match");
        throw { error: "Incorrect password" };
      }
      //step3->if passwords match then create token and send it to user .
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("Something went wrong in the sign in process ");
      throw error;
    }
  }

  async isAuthenticated(token) {
    //now user already has the token because after the 1st signin user got the token from the server
    //so if next time user tries to login using token the server has to authenticate the token .
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getById(response.id);
      //even if the token is verified we are checking whether the user still has an account in our database
      //it might be possible that he might have deleted the account so in that case token should be not valid .
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the sign in process ");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "2 days" });
      return result;
    } catch (error) {
      console.log("something went wrong in token creation ");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something went wrong in token validation ");
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison ");
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in service layer ");
      throw error;
    }
  }
}

module.exports = UserService;
