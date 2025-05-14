import adminModel from "../../models/adminModel";

export const findAdminByEmail = async (email: string) => {
  const admin = await adminModel.findOne({ email });
  if (!admin) {
    throw new Error("Admin not found");
  }
  return admin;
};


export const checkAdminExistence = async (email: string) => {
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
        throw new Error("Email already registered");
    }
};