import { z } from "zod";

export const hotelschema = z.object({
    name: z.string().min(1),
    location: z.string().min(1),
    rating: z.number().min(0).max(5).optional(),
    rating_count: z.number().min(0).optional()
})