
export default function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('login to continue');
    }
}