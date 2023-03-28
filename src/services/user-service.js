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
}

module.exports = UserService;
