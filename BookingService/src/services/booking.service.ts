import { CreateBooking, createIdempotencyKey, getIdempotencyKey,confirmBooking } from "../repositories/booking.repository";
import { CreateBookingDTO } from "../dto/bookingservice.dto";
import { generateIdempotencyKey } from "../utils/generateidempotencykey";

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
    const idempotencyKeyData=await getIdempotencyKey(idempotencyKey);
    if(!idempotencyKeyData){
        throw new Error("Idempotency key is required");
    }   
    if(idempotencyKeyData.finalized){
        throw new Error("Booking is already finalized");
    }
    const booking=await confirmBooking(idempotencyKeyData.bookingId);
    await confirmBookingService(idempotencyKey)
    return booking;
}

