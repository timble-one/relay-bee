import {z} from "zod"

export type ObjectSchema = z.ZodType<Record<string, unknown>, Record<string, unknown>>
