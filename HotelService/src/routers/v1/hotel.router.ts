import express from 'express';
import { createHotelHandler, deleteHotelByIdHandler, getallhotelhandler, getidhandler } from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { hotelschema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelschema),createHotelHandler);
hotelRouter.get('/:id', getidhandler);
hotelRouter.get('/', getallhotelhandler);
hotelRouter.delete('/:id', deleteHotelByIdHandler);
export default hotelRouter;
