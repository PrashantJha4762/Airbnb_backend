import { Request, Response, NextFunction } from 'express';
import { CreateHotelservice, deleteHotelByIdService, getAllHotels, getHotelByIdService } from '../services/hotel.service';
export const createHotelHandler = async (req: Request, res: Response, next: NextFunction) => {
    //1.call the service layer 
    const hotelresponse= await CreateHotelservice(req.body);
    //2. send the response
    res.status(201).json({
        message:'Hotel created successfully',
        data:hotelresponse,
        success:true
    });
}
export const getidhandler = async (req: Request, res: Response, next: NextFunction) => {
    //1.call the service layer 
    const hotelresponse= await getHotelByIdService(Number(req.params.id));
    //2. send the response
    res.status(201).json({
        message:'Hotel created successfully',
        data:hotelresponse,
        success:true
    });
}
export const getallhotelhandler= async (req: Request, res: Response, next: NextFunction) => {
    //1.call the service layer
    const hotelresponse=await getAllHotels();

    //2. send the response
    res.status(200).json({
        message:'Hotels fetched successfully',
        data:hotelresponse,
        success:true
    });
}
export const deleteHotelByIdHandler= async (req: Request, res: Response, next: NextFunction) => {
    //1.call the service layer
    const hotelresponse=await deleteHotelByIdService(Number(req.params.id));    
    //2. send the response
    res.status(200).json({
        message:'Hotel deleted successfully',
        data:hotelresponse,
        success:true
    });
}   