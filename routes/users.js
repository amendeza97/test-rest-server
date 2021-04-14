const { Router } = require("express");

const { getUsers, putUsers, deleteUsers, postUsers, patchUsers } = require('../controllers/users');

const router = Router();

router.post("/", postUsers);
router.put("/:userId", putUsers);
router.get("/", getUsers);
router.delete("/",deleteUsers);
router.patch("/",patchUsers);

module.exports = router;
