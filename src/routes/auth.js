import { Router } from "express"
import passport from "passport"

const router = Router()

router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

router.get('/auth/google/calback', passport.authenticate('google'), (req, res)=>{
    res.redirect('/')
})

router.get('/logout', function(req, res, next){
    res.clearCookie('connect.sid'); 
	req.logout(function(err) {
		console.log(err)
		req.session.destroy(function (err) { // destroys the session
			res.redirect('/')
		});
	});
  });
export default router