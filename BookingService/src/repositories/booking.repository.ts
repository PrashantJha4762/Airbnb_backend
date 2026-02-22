import { Prisma,IdempotencyKey } from "@prisma/client";
import PrismaClient from "../prisma/client";
import {validate as IsvalidUUID} from "uuid";
export async function CreateBooking(bookingInput:Prisma.BookingCreateInput) {
    const booking=await PrismaClient.booking.create({
        data:bookingInput
    })
    return booking;
}
export async function createIdempotencyKey(key:string,bookingId:number){
    const idempotencyKey=await PrismaClient.idempotencyKey.create({
        data:{
            idemKey:key,
            booking:{
                connect:{id:bookingId}
            }
        }
    })
    return idempotencyKey;
}
export async function getIdempotencyKeywithlock(tx:Prisma.TransactionClient,key:string){
    if(!IsvalidUUID(key)){
        throw new Error("Invalid idempotency key");
    }
    const idempotencyKey:Array<IdempotencyKey>=await tx.$queryRaw `SELECT * FROM IdempotencyKey WHERE idemKey=${key} FOR UPDATE`

    console.log("Idempotency key with lock",idempotencyKey);
    

    if(idempotencyKey.length===0||!idempotencyKey){
        throw new Error("Idempotency key not found");
    }

    return idempotencyKey[0];
}

export async function getBookingById(bookingId:number){
    const booking=await PrismaClient.booking.findUnique({
        where:{
            id:bookingId           
        }   
     })
    return booking;
}
export async function finalizeBooking(bookingId:number,status:Prisma.EnumBookingStatusFieldUpdateOperationsInput){
    const booking=await PrismaClient.booking.update({
        where:{
            id:bookingId           
        },
        data:{
            status:status
        }
     })
    return booking;
}
export async function confirmBooking(tx:Prisma.TransactionClient,bookingId:number){
    const booking=await tx.booking.update({
        where:{
            id:bookingId           
        },
        data:{
            status:"CONFIRMED"
        }
     })
    return booking;
}
export async function cancelBooking(bookingId:number){
    const booking=await PrismaClient.booking.update({
        where:{
            id:bookingId           
        },
        data:{
            status:"CANCELLED"
        }
     })
    return booking;
}   
export async function finalizeIdempotencyKey(tx:Prisma.TransactionClient,key:string){
    const idempotencyKey=await tx.idempotencyKey.update({
        where :{
            idemKey:key
        },
        data:{
            finalized:true
        }
    })
    return idempotencyKey;
}

