import Router from "express";
import loggedIn from "../middlewares/authenticator.js";
import Habit  from "../models/habit.js";
import User from "../models/users.js";


const router = Router()

router.get('/', async(req, res)=>{
    try{
    const user = req.user
    const userhabits = await Habit.find({ 'members.user': user._id }).populate({
      path: 'members.user', 
      select: 'name' 
    }).exec();
    const habitsWithMemberCount = userhabits.map(habit => {
        return {
          ...habit.toObject(), // Convert Mongoose document to plain object
          memberCount: habit.members.length
        };
      });
    console.log('User habits:', userhabits);
    console.log('this is users detail', habitsWithMemberCount)
    res.render('index.ejs', {'habits': habitsWithMemberCount, 'user': user})
    } catch(error){
        
        res.redirect('/')
        console.log('You must Login first')
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
            members: [{user: user.id}]
        })

        const newSavedHabit = await newHabit.save()

        const updatedUser = await User.findByIdAndUpdate(user.id, {habits: user.id})
      
          if (!updatedUser) {
            console.log("User not found");
            return res.status(404).send("User not found");
          }
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})
export default router