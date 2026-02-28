import dotenv from 'dotenv'
type Serverconfig={
    port:number,
    REDIS_HOST:string,
    REDIS_PORT:number
}
function loadenv(){
    dotenv.config();
}
loadenv();
export const serverconfig:Serverconfig={
    port:Number(process.env.PORT)||3001,
    REDIS_HOST:process.env.REDIS_HOST||'localhost',
    REDIS_PORT:Number(process.env.REDIS_PORT)||6379
}