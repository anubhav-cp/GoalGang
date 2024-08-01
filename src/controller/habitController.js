import Habit from "../models/habit.js";
import User from "../models/users.js";
import mongoose from "mongoose";

const joinHabit = async (req, res) => {
  const userId = req.user._id;
  const habitId = req.params.id;

  try {
    const user = await User.findById(userId);
    const habit = await Habit.findById(habitId);

    if (!user || !habit) {
      return res.status(400).json("User or Habit not found!");
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
        // Check if the user is already a member
        const isUserMember = habit.members.some(member => member.user.equals(userObjectId));

        console.log('Is user member:', isUserMember);

        if (!isUserMember) {
            // Add the new member to the members array
            habit.members.push({ user: userObjectId });
            await habit.save(); // Save the updated document
            console.log('Member added successfully');

        user.habits.push(habit._id)
        await user.save()
        } else {
            console.log('User is already a member');
        }
    

        res.redirect('/')
  } catch (error) {
    console.log("Something went Wrong!", error);
  }
};


const addPointToMember = async(habitId, userId)=>{
    try {
      const habitGroup = await Habit.findById(habitId)
      const member = await habitGroup.members.find(m => m.user.toString() === userId.toString())
      console.log('this is member', member)

      if(member){
        member.points += 1
        await habitGroup.save()
      }
    } catch (error) {
      console.log("Oops", error)
    }
}



const leaveHabit = async (req, res) => {
  const userId = req.user._id;
  const habitId = req.params.id;

  try {
    const removeMember = await Habit.updateOne(
      { 'members.user': userId },
      { $pull: { members: {user: userId }} }
    );
    res.redirect('/');
  } catch (error) {
    console.log("Error leaving habit:", error);
    res.status(500).send("Error leaving habit");
  }
};

export default { joinHabit, leaveHabit, addPointToMember };
