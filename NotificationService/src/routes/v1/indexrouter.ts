import express from 'express'
import pingrouter from './pingrouter';
const v1router=express.Router();
v1router.use('/ping',pingrouter);
export default v1router;