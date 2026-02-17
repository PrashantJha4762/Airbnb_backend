import { createHotelDTO } from "../dto/hotel.dto";
import { CreateHotel, deleteHotelById, getallHotels, gethotelById } from "../repositories/hotel.repository";

export async function CreateHotelservice(hoteldata:createHotelDTO){
    const hotel=await CreateHotel(hoteldata);
    return hotel;
}
export async function getHotelByIdService(id:number){
    const hotel=await gethotelById(id);
    return hotel;
}   
export async function getAllHotels() {
    const hotels = await getallHotels();
    return hotels;
}
export async function deleteHotelByIdService(id:number){
    const hotel=await deleteHotelById(id);
    return hotel;
}