const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require('../controllers/auth');
const { validateFields } = require("../middlewares/fields-validator");

const router = Router();

router.post("/login",[
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateFields
], login);

module.exports = router;
