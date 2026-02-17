import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./sequelize";

class Hotel extends Model<InferAttributes<Hotel>,InferCreationAttributes<Hotel>>{
    declare id:CreationOptional<number>;
    declare name:string;
    declare location:string;
    declare rating?:number;
    declare rating_count?:number;
    declare createdAt:CreationOptional<Date>; 
    declare updatedAt:CreationOptional<Date>;
    declare deletedAt:CreationOptional<Date|null>;
}
//This hotel.init() method is used to initialize the Hotel model with its attributes and their data types. It defines the structure of the Hotel table in the database, including columns for id, name, location, rating, rating_count, createdAt, and updatedAt. It helps Sequelize understand how to interact with the Hotel table and perform operations such as creating, reading, updating, and deleting hotel records..ie mapping the model to the database table.
Hotel.init({
    id:{
        type: 'INTEGER',
        autoIncrement:true,
        primaryKey:true,
},
    name:{
        type:'STRING',
        allowNull:false,
},
    location:{
        type:'STRING',
        allowNull:false,
},
    rating:{
        type:'FLOAT',
        allowNull:true,
},  
    rating_count:{
        type:'INT',
        allowNull:true,
},
    deletedAt:{
        type:'DATE',
        allowNull:true,
        defaultValue:null
},
    createdAt:{
        type:'DATE',
        defaultValue:new Date(),
},
    updatedAt:{
        type:'DATE',
        defaultValue:new Date(),
},
}

,{
    tableName:'hotels',
    sequelize:sequelize,
    timestamps:true, // this option tells Sequelize to automatically manage the createdAt and updatedAt fields for the Hotel model. When you create a new hotel record, Sequelize will automatically set the createdAt field to the current date and time. When you update an existing hotel record, Sequelize will automatically update the updatedAt field to the current date and time. This helps keep track of when records were created and last modified without requiring manual handling of these timestamps in your application code.
})
export default Hotel;
