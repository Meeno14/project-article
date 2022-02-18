const { authJwt } = require("./app/middleware");
const express = require("express");
const db = require("./app/models");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const authController = require("./app/controllers/auth.controller");
const userController = require("./app/controllers/user.controller");
const crud = require("./app/crud/crud");
const { verifySignUp } = require("./app/middleware");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post(
  "/api/auth/signup",
  verifySignUp.checkDuplicateUsernameOrEmail,
  authController.signup
);
app.post("/api/auth/signin", authController.signin);
app.get("/api/test/all", userController.allAccess);
app.get("/api/test/user", [authJwt.verifyToken], userController.userBoard);
app.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);
app.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/api/crud/get", crud.getSite);
app.post("/api/crud/post", upload.single("image"), crud.postSite);
app.delete("/api/crud/del/:id", crud.deleteSite);
app.put("/api/crud/put/:id", upload.single("image"), crud.changeSite);

// db.sequelize.sync({ force: true });

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
