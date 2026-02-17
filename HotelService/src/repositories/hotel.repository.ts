
import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function CreateHotel(hoteldata:createHotelDTO){
    const hotel=await Hotel.create(hoteldata);
    logger.info(`Hotel created successfully ${hotel.id}`);
    return hotel;
}
export async function gethotelById(id:number){
    const hotel=await Hotel.findByPk(id);
    if(!hotel){
        logger.error(`Hotel with id ${id} not found`);  
        throw new Error(`Hotel with id ${id} not found`);
    }
    logger.info(`Hotel with id ${id} fetched successfully`);
    return hotel;
}
export async function getallHotels(){
    const hotels=Hotel.findAll({
        where:{
            deletedAt:null
        }
    }      
    );
    if(!hotels){
        logger.error(`No hotels found`);
        throw new NotFoundError(`No hotels found`);
    }
    logger.info(`Hotels fetched successfully`);
    return hotels;
}
export async function deleteHotelById(id:number){
    const hotel=await Hotel.findByPk(id);
    if(!hotel){
        logger.error(`Hotel with id ${id} not found`);  
        throw new Error(`Hotel with id ${id} not found`);
    }   
    hotel.deletedAt=new Date();
    await hotel.save();
    logger.info(`Hotel with id ${id} deleted successfully`);
    return true;
}
