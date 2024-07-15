import { Router } from "express"
import authrouter from "./auth.js"
import homerouter from "./home.js"

const router = Router()


router.use(authrouter)
router.use(homerouter)



export default router