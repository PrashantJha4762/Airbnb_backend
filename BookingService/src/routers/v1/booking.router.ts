import express from 'express';
import {  validateRequestBody } from '../../validators';
import { BookingSchema } from '../../validators/booking.validator';
import {  confirmBookingHandler, createBookingHandler } from '../../controllers/booking.controller';

const bookingrouter = express.Router();

bookingrouter.post('/', validateRequestBody(BookingSchema), createBookingHandler); 
bookingrouter.post('/confirm/:idempotencyKey', confirmBookingHandler); 

export default bookingrouter;