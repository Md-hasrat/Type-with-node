import mongoose from "mongoose";
import { QueryParams } from "../zodSchema/querySchem";

export const getAllFaqQuery = async (data: QueryParams) => {
  const { page, limit, filter, search, sort } = data;

  const pipeline: any[] = [];

  // Join with faqcategories collection
  pipeline.push({
    $lookup: {
      from: "faqcategories", // Ensure this matches the actual collection name
      localField: "faqCategoryId",
      foreignField: "_id",
      as: "faqCategoryDetails",
    },
  });

  pipeline.push({
    $unwind: {
      path: "$faqCategoryDetails",
      preserveNullAndEmptyArrays: true,
    },
  });

  // Search
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { question: { $regex: search, $options: "i" } },
          { answer: { $regex: search, $options: "i" } },
          { "faqCategoryDetails.title": { $regex: search, $options: "i" } },
          { "faqCategoryDetails.description": { $regex: search, $options: "i" } },
        ],
      },
    });
  }

  // Filter by ObjectId (category) or status
  if (filter) {
    if (mongoose.Types.ObjectId.isValid(filter)) {
      pipeline.push({
        $match: {
          faqCategoryId: new mongoose.Types.ObjectId(filter),
        },
      });
    } else {
      pipeline.push({
        $match: {
          status: filter, // matches "draft", "published", or "archived"
        },
      });
    }
  }

  // Sort (default = newest first)
  pipeline.push({
    $sort: {
      createdAt: sort === "asc" ? 1 : -1,
    },
  });

  const skip = (page - 1) * limit;

  pipeline.push({
    $facet: {
      metadata: [
        { $count: "total" },
        {
          $addFields: {
            currentPage: page,
            limit: limit,
          },
        },
      ],
      data: [{ $skip: skip }, { $limit: limit }],
    },
  });

  return pipeline;
};
