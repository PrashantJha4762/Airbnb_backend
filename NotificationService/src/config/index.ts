import dotenv from 'dotenv'
type Serverconfig={
    port:number,
    REDIS_HOST:string,
    REDIS_PORT:number,
    EMAIL_USER:string,
    EMAIL_PASS:string
}
function loadenv(){
    dotenv.config();
}
loadenv();
export const serverconfig:Serverconfig={
    port:Number(process.env.PORT)||3001,
    REDIS_HOST:process.env.REDIS_HOST||'localhost',
    REDIS_PORT:Number(process.env.REDIS_PORT)||6379,
    EMAIL_USER:process.env.EMAIL_USER||'',
    EMAIL_PASS:process.env.EMAIL_PASS||''
}