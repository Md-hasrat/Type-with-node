import { z } from "zod";


export const querySchema = z.object({
    page: z.string().transform((val) => parseInt(val, 10)),
    limit: z.string().transform((val) => parseInt(val, 10)),
    search: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    filter: z.string().optional(),
})

export type QueryParams = z.infer<typeof querySchema>