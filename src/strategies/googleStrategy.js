import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../models/users.js";

passport.serializeUser((user, done)=>{
    console.log('this is the user', user)
    console.log(user.id)
    done(null, user.id)
})

passport.deserializeUser( async (id, done)=>{
    try {
        const findUser = await User.findById(id)
        console.log('fd', findUser)
        return findUser ? done(null, findUser) : done(null, null)
    } catch (error) {
        done(error, null)
    }
})

export default passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done)=>{
    console.log(profile)
    let findUser;
    try {
        findUser = await User.findOne({userId: profile.id})

    } catch (error) {
        return done(error, null)
        
    }

    try{
        if(!findUser){
            const newUser = await User.create({
                name: profile.displayName,
                userId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
            const savedUser = await newUser.save()
            console.log('this is saved user', savedUser)
            return done(null, savedUser)
        }
        return done(null, findUser);
    } catch(error){
        return done(error, null)
    }
}))

