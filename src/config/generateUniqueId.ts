import { Model } from "mongoose";

export async function generateNextCustomId(
  model: Model<any>,
  prefix: string,
  key: string
): Promise<string> {
  try {
    const lastDocument = await model.findOne({}, {}, { sort: { createdAt: -1 } });

    if (lastDocument && typeof lastDocument[key] === "string" && lastDocument[key].includes("#")) {
      const lastCustomIdParts = lastDocument[key].split("#");
      const lastNumber = parseInt(lastCustomIdParts[1]);

      if (isNaN(lastNumber)) {
        throw new Error("Invalid format in last custom ID");
      }

      const nextNumber = lastNumber + 1;
      const newId = `${prefix}#${nextNumber > 9 ? nextNumber : "0" + nextNumber}`;

      const isExist = await model.findOne({ [key]: newId }); // ✅ fixed here
      return isExist
        ? await generateNextCustomId(model, prefix, key)
        : newId;
    } else {
      return `${prefix}#01`;
    }
  } catch (err: any) {
    throw new Error(`Failed to generate custom ID: ${err.message}`);
  }
}
