const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/fields-validator");
const {
  isValidRole,
  isEmailRegistered,
  isUserExistingById,
} = require("../helpers/db-validators");

const {
  getUsers,
  putUsers,
  deleteUsers,
  postUsers,
  patchUsers,
} = require("../controllers/users");

const router = Router();

router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("email").custom(isEmailRegistered),
    check("name", "Name is mandatory").not().isEmpty(),
    check(
      "password",
      "Password is mandatory and should has 6 minimum caracteres "
    ).isLength({ min: 6 }),
    check("role").custom(isValidRole),
    validateFields,
  ],
  postUsers
);

router.put(
  "/:userId",
  [
    check("userId", "Invalid id").isMongoId(),
    check("userId").custom(isUserExistingById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  putUsers
);

router.get("/", getUsers);
router.delete(
  "/:userId",
  [
    check("userId", "Invalid id").isMongoId(),
    check("userId").custom(isUserExistingById),
    validateFields
  ],
  deleteUsers
);
router.patch("/", patchUsers);

module.exports = router;
