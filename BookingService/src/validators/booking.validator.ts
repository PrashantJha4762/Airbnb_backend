import {z} from "zod";

export const BookingSchema = z.object({
    userId: z.number(),
    hotelId: z.number(),
    totalGuests: z.number().min(1),
    bookingAmount: z.number().min(0)
})