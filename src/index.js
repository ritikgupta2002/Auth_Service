const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const apiRoutes = require("./routes/index");

// const UserService = require("./services/user-service");

const app = express();

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server Started on PORT:${PORT}`);

    // const service = new UserService();
    // const newToken = service.createToken({ email: "ritik@admin.com",id:1 });
    // console.log("new token is ",newToken);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpdGlrQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2Nzk5OTU3MzIsImV4cCI6MTY3OTk5NTc2Mn0.aVdfSpsO6H_cFPkdW3EqkLsnfyjZpPp122ou_dG76DM';
    // const response = service.verifyToken(token);
    // console.log(response);
  });
};

prepareAndStartServer();
