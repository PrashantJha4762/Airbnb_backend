import express from 'express'
import pinghandler from '../../controllers/pinghandler';
import { validaterequestbody } from '../../validators';
import pingschema from '../../validators/pingvalidator';
const pingrouter=express.Router();
pingrouter.get('/',validaterequestbody(pingschema),pinghandler);
pingrouter.get('/health',(req,res)=>{
    res.send("Hello jis").status(200);
})
export default pingrouter