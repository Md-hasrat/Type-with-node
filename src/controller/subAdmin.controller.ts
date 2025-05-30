import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { getAdminByIdSchema, subadminSearchQuerySchema, updateSubAdminSchema } from "../zodSchema/subAdminSchema";
import { responseHandler } from "../../utils/responseHandler";
import adminModel from "../models/adminModel";
import mongoose from "mongoose";



export const updateSubAdmin = asyncHandler(async (req: Request, res: Response) => {
    const validate = updateSubAdminSchema.safeParse({
        params: req.params,
        body: req.body,
    })

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { fullName, email, phone } = validate.data.body

    const objectId = new mongoose.Types.ObjectId(validate.data.params.id)

    const existingSubAdmin = await adminModel.findById(objectId)

    if (!existingSubAdmin) {
        return responseHandler(res, false, "Sub admin not found", 404)
    }

    if (existingSubAdmin.userType === "admin") {
        return responseHandler(res, false, "You can't update admin details", 400)
    }

    const updatedSubAdmin = await adminModel.findByIdAndUpdate(
        objectId,
        {
            fullName,
            email,
            phone
        },
        { new: true }
    )
        .select("-password")

    if (!updatedSubAdmin) {
        return responseHandler(res, false, "Sub admin not found", 404)
    }

    const subadminWithRole = await adminModel.aggregate([
        { $match: { _id: objectId } },
        { $match: { userType: "subAdmin" } },

        {
            $lookup: {
                from: "roles",
                localField: "roleId",
                foreignField: "_id",
                as: "roleDetails"
            }
        },
        { $unwind: "$roleDetails" },
        {
            $project: {
                _id: 1,
                registrationId: 1,
                fullName: 1,
                email: 1,
                phone: 1,
                userType: 1,
                role: "$roleDetails.roleName"
            }
        }
    ])

    return responseHandler(res, true, "Sub admin updated successfully", 200, {
        subAdmin: subadminWithRole
    })
});


export const getSubadminById = asyncHandler(async (req: Request, res: Response) => {
    const validate = getAdminByIdSchema.safeParse({
        params: req.params,
    })

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const objectId = new mongoose.Types.ObjectId(validate.data.params.id)

    const subadminWithRole = await adminModel.aggregate([
        {
            $match: {
                _id: objectId,
                isDeleted: false,
                userType: "subAdmin"
            }
        },

        {
            $lookup: {
                from: "roles",
                localField: "roleId",
                foreignField: "_id",
                as: "roleDetails"
            }
        },
        { $unwind: "$roleDetails" },
        {
            $project: {
                _id: 1,
                registrationId: 1,
                fullName: 1,
                email: 1,
                phone: 1,
                userType: 1,
                role: "$roleDetails.roleName"
            }
        }
    ])

    if (subadminWithRole.length === 0) {
        return responseHandler(res, false, "Sub admin not found", 404)
    }

    return responseHandler(res, true, "Sub admin found successfully", 200, subadminWithRole[0])

})


export const deleteSubAdmin = asyncHandler(async (req: Request, res: Response) => {
    const validate = getAdminByIdSchema.safeParse({
        params: req.params,
    })

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const objectId = new mongoose.Types.ObjectId(validate.data.params.id)

    const existingSubAdmin = await adminModel.findById(objectId)

    if (!existingSubAdmin) {
        return responseHandler(res, false, "Sub admin not found", 404)
    }

    if (existingSubAdmin.userType === "admin") {
        return responseHandler(res, false, "You can't delete admin", 400)
    }

    if (existingSubAdmin.isDeleted) {
        return responseHandler(res, false, "Sub admin is already deleted", 400);
    }

    const deletedSubAdmin = await adminModel.findByIdAndUpdate(
        objectId,
        {
            isDeleted: true
        },
        { new: true }
    )

    return responseHandler(res, true, "Sub admin deleted successfully", 200,
        {
            id: deletedSubAdmin._id,
            fullName: deletedSubAdmin.fullName
        })
})



export const getAllSubadmin = asyncHandler(async (req: Request, res: Response) => {
  // Parse and validate query params with defaults
  const { search, page, limit } = subadminSearchQuerySchema.parse(req.query);
  const skip = (page - 1) * limit;

  // Build base match filter
  const matchStage: Record<string, any> = {
    isDeleted: false,
    userType: 'subAdmin',
  };

  if (search) {
    matchStage.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { registrationId: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  // Count total matching documents (for pagination metadata)
  const total = await adminModel.countDocuments(matchStage);

  // Fetch paginated subadmins with role lookup
  const subadmins = await adminModel.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'roles', // Ensure this is the correct roles collection name
        localField: 'roleId',
        foreignField: '_id',
        as: 'role',
      },
    },
    { $unwind: { path: '$role', preserveNullAndEmptyArrays: true } },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  return responseHandler(res, true, 'Subadmins fetched successfully', 200, {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: subadmins,
  });
});

