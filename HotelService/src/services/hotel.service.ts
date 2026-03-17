import { createHotelDTO } from "../dto/hotel.dto";
import { HotelRepository } from "../repositories/hotel.repository";

const hotelrepository=new HotelRepository();

export async function CreateHotelservice(hoteldata:createHotelDTO){
    const hotel=await hotelrepository.create (hoteldata);
    return hotel;
}
export async function getHotelByIdService(id:number){
    const hotel=await hotelrepository.findById(id);
    return hotel;
}   
export async function getAllHotels() {
    const hotels = await hotelrepository.findAll();
    return hotels;
}
export async function deleteHotelByIdService(id:number){
    const hotel=await hotelrepository.softDelete(id);
    return hotel;
}