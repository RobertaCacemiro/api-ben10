const express = require("express");

const AdminMiddleware = require("../middlewares/admin.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");
const SerieController = require("../controllers/serie.controller");
const upload = require("../middlewares/uploadImage");

const router = express.Router();

// Lista as series
router.get("/", SerieController.list);

// Rotas com proteção

// Cadastrar series
router.post(
  "/",
  AuthMiddleware,
  upload.single("image"),
  SerieController.create
);
// router.post("/", AuthMiddleware, SerieController.create);

router.put(
  "/:id",
  AuthMiddleware,
  upload.single("image"),
  SerieController.update
);

router.patch(
  "/:id",
  AuthMiddleware,
  upload.single("image"),
  SerieController.patch
);

router.patch(
  "/:id",
  AuthMiddleware,
  AdminMiddleware,
  upload.single("image"),
  SerieController.patch
);

module.exports = router;
