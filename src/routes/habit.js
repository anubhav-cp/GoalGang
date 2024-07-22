import { Router } from "express";
import { Habit } from "../models/habit.js";
import loggedIn from "../middlewares/authenticator.js";
import habitController from '../controller/habitController.js'

const router = Router()


router.get('/join-habit/:id', loggedIn, habitController.joinHabit)
router.get('/leave-habit/:id', loggedIn, habitController.leaveHabit)


export default router