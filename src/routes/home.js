import Router from "express";
import loggedIn from "../middlewares/authenticator.js";
import { Habit } from "../models/habit.js";


const router = Router()

router.get('/', async(req, res)=>{
    try{
    const user = req.user
    const userhabits = await Habit.find({members: user.id}).populate('members').exec()
    console.log('this is yser ha', userhabits)
    res.render('index.ejs', {'habits': userhabits})
    } catch(error){
        res.render('index.ejs')
        console.log('something went wrong')
    }
})


router.post('/create-habit', loggedIn, async(req, res)=>{
    const {name, description, visibility} = req.body
    const user = req.user
    try {
        const newHabit = await Habit.create({
            name, 
            description, 
            visibility: visibility, 
            host: user, 
            members: [user.id]
        })

        const newSavedHabit = await newHabit.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})
export default router