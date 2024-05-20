import Express from "express";
import {
  register,
  login,
  logout,
  postResetPassWord,
  // postChangePassWord,
} from "../controllers/auth.js";

const router = Express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resetpassword", postResetPassWord);
// router.post("/reset/:token", authController.postChangePassWord);

export default router;
