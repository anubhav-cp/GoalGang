import { Router } from "express";
import  Habit  from "../models/habit.js";
import loggedIn from "../middlewares/authenticator.js";
import habitController from '../controller/habitController.js'
import mongoose from "mongoose";


const router = Router()


router.get('/join-habit/:id', loggedIn, habitController.joinHabit)
router.get('/leave-habit/:id', loggedIn, habitController.leaveHabit)
router.get('/complete-habit/:id', async(req, res)=>{
    const habitId = req.params.id
    const userId = req.user._id
    await habitController.addPointToMember(habitId, userId)
    res.redirect('/')
})


export default router