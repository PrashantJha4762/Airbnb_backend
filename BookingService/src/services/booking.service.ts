import { CreateBooking, createIdempotencyKey, getIdempotencyKeywithlock,confirmBooking, finalizeIdempotencyKey } from "../repositories/booking.repository";
import { CreateBookingDTO } from "../dto/bookingservice.dto";
import { generateIdempotencyKey } from "../utils/generateidempotencykey";
import PrismaClient from "../prisma/client"
import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";
import { InternalServerError } from "../utils/errors/app.error";

export async function CreateBookingService(createBookingDto:CreateBookingDTO){
    const ttl=serverConfig.LOCK_TTL;

    const bookingResource=`hotel:${createBookingDto.hotelId}`;

    try{
         await redlock.acquire([bookingResource],ttl);
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
    catch(error){
        throw new InternalServerError("Failed to create booking");
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
