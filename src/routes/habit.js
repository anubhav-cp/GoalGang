import { Router } from "express";
import { Habit } from "../models/habit.js";
import loggedIn from "../middlewares/authenticator.js";
import { User } from "../models/users.js";

const router = Router()


router.get('/join-habit/:id',  async(req, res)=>{
    const userId = req.user._id
    const habitId = req.params.id
    console.log(userId, habitId)

    try {
        const user = await User.findById(userId)
        const habit = await Habit.findById(habitId)

        if (!user || !habit){
            return res.status(400).json("User or Habit not found!")
        }

        if (!habit.members.includes(user.id)){
            habit.members.push(user.id)
            await habit.save()
        }
        
        res.redirect('/')
        // res.status(200).send('User successfully joined the habit');
    } catch (error) {
        console.log("Something went Wrong!", error)
    }
})

router.get('/leave-habit/:id', loggedIn, async(req, res)=>{
    const userId = req.user._id
    const habitId = req.params.id
    console.log(habitId)

    const removeMember = await Habit.updateOne({_id: habitId}, { $pull: {
        members: userId
    }})
    res.redirect('/')
})
export default router