import { Router } from "express"
import passport from "passport"

const router = Router()

router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

router.get('/auth/google/calback', passport.authenticate('google'), (req, res)=>{
    res.redirect('/')
})

export default router