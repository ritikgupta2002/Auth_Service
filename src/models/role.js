"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "User_Roles",
      });
      //by passing a string to through above we are asking sequelize to automatically generate a model named 
      //User_Roles as the through Table with two columns userId and roleId. A composite unique 
      //key will be established on these two columns .
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
