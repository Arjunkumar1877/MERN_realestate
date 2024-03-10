import express from 'express';
let router = express.Router();
import { google, signin, signup } from '../controllers/auth.controller.js';
import { signOut } from '../controllers/user.controller.js';


router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut)


export default router;

