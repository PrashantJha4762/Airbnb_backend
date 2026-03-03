import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Hotel from "./hotel";
import sequelize from "./sequelize";
import RoomCategory from "./roomCategory";

class Room extends Model<InferCreationAttributes<Room>,InferAttributes<Room>>{
    declare id:CreationOptional<number>;
    declare name:string;
    declare hotelId:number;
    declare createdAt:CreationOptional<Date>;
    declare updatedAt:CreationOptional<Date>;
    declare roomCategoryId:number;
    declare deletedAt:CreationOptional<Date|null>;
    declare bookingId:CreationOptional<number|null>;
    declare price:number;
    declare DateOfAvailablity:Date
}
Room.init({
    id:{
        type:'INTEGER',
        autoIncrement:true,
        primaryKey:true,    
    },
    name:{
        type:'STRING',
        allowNull:false,
    },
    hotelId:{
        type:'INTEGER',
        allowNull:false,
        references:{
            model:Hotel,
            key:'id'
        }
    },
    createdAt:{
        type:'Date',
        defaultValue:new Date()
    },
    updatedAt:{
        type:'Date',
        defaultValue:new Date()
    },
    roomCategoryId: {
      type: 'INTEGER',
      allowNull: false,
      references: {
        model: RoomCategory,
        key: 'id',
      },
    },
    deletedAt:{
        type:'Date',
        defaultValue:null
    },
    bookingId:{
        type:'INTEGER',
        defaultValue:null
    },
    price:{
        type:'INTEGER',
        allowNull:false
    },
    DateOfAvailablity:{
        type:'Date',
        allowNull:false
    }
},
    {
    tableName:'Room',
    sequelize:sequelize,
    timestamps:true,
    underscored:true
    }
)
export default Room;
