import { Router } from "express"
import authrouter from "./auth.js"
import homerouter from "./home.js"
import habitrouter from "./habit.js"

const router = Router()


router.use(authrouter)
router.use(homerouter)
router.use(habitrouter)


export default router