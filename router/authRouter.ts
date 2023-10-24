import { Router } from "express";
import {
  createUser,
  deleteOneUser,
  findOneUser,
  signIn,
  updateUser,
  veiwUser,
} from "../Controller/authController";
import multer from "multer";

const upload = multer().single("avatar");

const router = Router();

router.route("/create-user").post(upload, createUser);
router.route("/sign-in").post(signIn);
router.route("/:userID/delete").delete(deleteOneUser);
router.route("/:userID/update").patch(upload,updateUser);
router.route("/:userID/view-one").get(findOneUser);
router.route("/view-all").get(veiwUser);

export default router;
