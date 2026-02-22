import { CreateBooking, createIdempotencyKey, getIdempotencyKeywithlock,confirmBooking, finalizeIdempotencyKey } from "../repositories/booking.repository";
import { CreateBookingDTO } from "../dto/bookingservice.dto";
import { generateIdempotencyKey } from "../utils/generateidempotencykey";
import PrismaClient from "../prisma/client"

export async function CreateBookingService(createBookingDto:CreateBookingDTO){
    const booking= await CreateBooking({
        userId: createBookingDto.userId,
        hotelId: createBookingDto.hotelId,
        totalGuests: createBookingDto.totalGuests,
        bookingAmount: createBookingDto.bookingAmount
    });
    const idempotencyKey=generateIdempotencyKey();

    await createIdempotencyKey(idempotencyKey,booking.id);
    return {
        bookingId:booking.id,
        idempotencyKey:idempotencyKey
    }
}

export async function confirmBookingService(idempotencyKey:string){
    return PrismaClient.$transaction(async (tx) => {
        const idempotencyKeyData=await getIdempotencyKeywithlock(tx,idempotencyKey);
        if(!idempotencyKeyData){
            throw new Error("Idempotency key is required");
        }
        if(idempotencyKeyData.finalized){
            throw new Error("Booking is already finalized");
        }
        const booking=await confirmBooking(tx,idempotencyKeyData.bookingId);
        await finalizeIdempotencyKey(tx,idempotencyKey);
        return booking;
    })
}
