import Router from "express";
import loggedIn from "../middlewares/authenticator.js";

const router = Router()

router.get('/',  loggedIn, (req, res)=>{

    res.send('Welcome ')
})

export default router