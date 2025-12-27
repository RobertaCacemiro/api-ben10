const express = require("express");
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AdminMiddleware = require("../middlewares/AdminMiddleware");

const router = express.Router();

router.post("/login", AuthController.login);
router.post(
  "/register",
  AuthMiddleware,
  AdminMiddleware,
  AuthController.register
);

router.get("/verificacao", (req, res) => {
  res.send(
    "API para cadastro de projetos a serem utilizado em portfolios, está funcioando!"
  );
});
// router.post("/login", AuthController.login);

module.exports = router;
