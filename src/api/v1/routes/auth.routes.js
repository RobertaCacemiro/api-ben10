const express = require("express");
const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const AdminMiddleware = require("../middlewares/admin.middleware");

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
