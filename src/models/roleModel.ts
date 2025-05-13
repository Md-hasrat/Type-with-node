import mongoose, { Schema, Document } from "mongoose"

// Interface for the access rights of each module
interface ModuleAccess {
    read: boolean;
    fullAccess: boolean;
}

// Schema for the access rights of each module
const ModuleAccessSchema = {
    read: {
        type: Boolean,
        default: false,
    },
    fullAccess: {
        type: Boolean,
        default: false,
    },
}

// Interface for the role model
export interface IRole extends Document {
    roleName: string;   
    accessRights: AccessRights;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for the access rights of each module
interface AccessRights {
    dashboard: ModuleAccess;
    userManagement: ModuleAccess;
    subAdminManagement: ModuleAccess;
    staticContent: ModuleAccess;
    notificationManagement: ModuleAccess;
}

// Schema for the role model
const roleSchema = new Schema({
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    accessRights: {
        dashboard: ModuleAccessSchema,
        userManagement: ModuleAccessSchema,
        subAdminManagement: ModuleAccessSchema,
        staticContent: ModuleAccessSchema,
        notificationManagement: ModuleAccessSchema,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    }
},{
    timestamps: true
})


const RoleModel = mongoose.model<IRole>("Role", roleSchema)
export default RoleModel
