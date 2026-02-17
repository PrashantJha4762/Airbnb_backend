import { Sequelize } from "sequelize";
import { dbconfig } from "../../config";

const sequelize=new Sequelize({
    database: dbconfig.DB_NAME,
    username:dbconfig.DB_USER,
    password:dbconfig.DB_PASSWORD,
    host:dbconfig.DB_HOST,
    dialect:'mysql',
    logging:true,      //this line indicates that Sequelize will log all SQL queries to the console. This can be useful for debugging and monitoring database interactions, as it allows developers to see the actual SQL statements being executed against the database.
})

export default sequelize;
