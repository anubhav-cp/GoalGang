import Router from "express";
import loggedIn from "../middlewares/authenticator.js";
import Habit  from "../models/habit.js";
import User from "../models/users.js";


const router = Router()

router.get('/', async (req, res) => {
  try {
    const user = req.user;
    console.log(user)

    // Check if user is authenticated
    if (!user) {
      return res.redirect('/login'); // Redirect to login if user is not authenticated
    }

    // Fetch user habits with populated members
    const userhabits = await Habit.find({ 'members.user': user._id })
      .populate({
        path: 'members.user',
        select: 'name avatar'
      })
      .exec();

    // If no habits are found, handle the case
    if (userhabits.length === 0) {
      console.log('No habits found for the user');
      return res.render('index.ejs', { habits: [], user: user, members: [] });
    }

    // Process each habit to include member count and sort members by points
    const habitsWithMemberDetails = await Promise.all(
      userhabits.map(async (habit) => {
        const activeMembers = habit.members.filter(member => member.points > 0);
        const sortedMembers = activeMembers.sort((a, b) => b.points - a.points);

        return {
          ...habit.toObject(), // Convert Mongoose document to plain object
          memberCount: habit.members.length,
          members: sortedMembers
        };
      })
    );

    // Render the view with data
    res.render('index.ejs', { habits: habitsWithMemberDetails, user: user });

  } catch (error) {
    // Log the error and handle unexpected issues
    console.error('Error occurred:', error);
    res.redirect('/'); // Redirect to home or another error page
  }
});




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
        res.redirect('/', {habit: newSavedHabit})
    } catch (error) {
        console.log(error)
    }
})
export default router