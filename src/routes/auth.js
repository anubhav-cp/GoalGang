import { Router } from "express"
import passport from "passport"

const router = Router()

router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

router.get('/auth/google/calback', passport.authenticate('google'), (req, res)=>{
    res.redirect('/')
})

router.get('/logout', function(req, res, next){
    res.clearCookie('connect.sid', {path: '/'}); 
	req.logout(function(err) {
		console.log(err)
		req.session.destroy(function (err) { // destroys the session
			res.send(200)
		});
	});
  });


router.get('/login', (req, res)=>{
	res.render('login.ejs')
})
export default router