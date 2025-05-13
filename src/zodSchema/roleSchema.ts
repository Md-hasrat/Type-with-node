 import { z } from 'zod';

const moduleAccessSchema = z.object({
    read: z.boolean(),
    fullAccess: z.boolean(),
})
      
const accessRightsSchema = z.object({
    dashboard: moduleAccessSchema,
    userManagement: moduleAccessSchema,
    subAdminManagement: moduleAccessSchema,
    staticContent: moduleAccessSchema,
    notificationManagement: moduleAccessSchema,
})

export const createRoleSchema = {
    body: z.object({
        roleName: z.string().min(1, { message: 'Role name is required' }),
        accessRights: accessRightsSchema,
    })
}
