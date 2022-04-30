import express from "express";

const router = express.Router();

import {sendMail } from "../controller/mail_controller.js";
import {registerAdmin , adminLogin} from "../controller/admin_controller.js"
import { createBlog } from "../controller/blog_controller.js";

router.post("/send", sendMail);
router.post("/admin", registerAdmin);
router.post("/login", adminLogin);
router.post("/blog/:adminId", createBlog);


export default router;    