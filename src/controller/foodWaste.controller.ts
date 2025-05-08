import { Response, Request } from 'express'
import { asyncHandler } from '../../utils/errrorHandler'
import { FoodWasteInput, foodWasteSchema } from '../zodSchema/foodWasteSchema'
import { responseHandler } from '../../utils/responseHandler'
import FoodWaste from '../models/foodWasteModel'
import { generateNextCustomId } from '../config/generateUniqueId'
import User from '../models/userModel'


export const createFoodWaste = asyncHandler(async (req: Request, res: Response) => {
    const validate = foodWasteSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { userId, date, meat, dairy, other, totalWaste, meatPercentage, dairyPercentage, otherPercentage } = validate.data as FoodWasteInput

    const foodId = await generateNextCustomId(FoodWaste, "FOOD", "foodId");

    const user = await User.findById(userId)

    if (!user) {
        return responseHandler(res, false, "User not found", 404)
    }

    const foodWaste = new FoodWaste({
        foodId,
        userId,
        date,
        meat,
        dairy,
        other,
        totalWaste,
        meatPercentage,
        dairyPercentage,
        otherPercentage
    })
    await foodWaste.save()

    return responseHandler(res, true, "Food waste added successfully", 201, foodWaste)
})