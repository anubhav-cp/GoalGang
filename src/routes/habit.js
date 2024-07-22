import { Router } from "express";
import { Habit } from "../models/habit.js";
import loggedIn from "../middlewares/authenticator.js";
import { User } from "../models/users.js";

const router = Router()


router.post('/join-habit',  async(req, res)=>{
    const { userId, habitId } = req.body;
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

        res.status(200).send('User successfully joined the habit');
    } catch (error) {
        console.log("Something went Wrong!", error)
    }
})

export default router