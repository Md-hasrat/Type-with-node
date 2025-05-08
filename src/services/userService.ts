import mongoose from "mongoose";
import User from "../models/userModel";
import FoodWaste from "../models/foodWasteModel";



export async function deleteAllUsersFood(userId: string) {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const user = await User.findById(userObjectId);
        if (!user) {
            throw new Error("User not found")
        }

        // Create a store as summary for all food waste records deleted
        const foodWasteSummary = {
            userId: userId,
            email: user.email,
            foodWasterecordDeleted: 0
        }

        // Permanently delete all food waste records of the user
        const foodWasteResult = await FoodWaste.deleteMany({ userId: userObjectId });
        // Store the number of deleted records in the summary
        foodWasteSummary.foodWasterecordDeleted = foodWasteResult.deletedCount

        // Now permanently delete the user
        const userResult = await User.findByIdAndDelete(userObjectId);

        return foodWasteSummary;
    } catch (error) {
        throw new Error("Error deleting user food waste records: " + error.message);
    }
}