import mongoose from 'mongoose';


const uri = process.env.MONGODB_URI;
const options = {
  dbName: "react-dashboard"
};
let connection;

const connectToDb = async () => {
     if (connection) return connection; // return connection with exists

    try {

    if(!connection) { // try to connect if there isn't a connection

       // handling events with the connection handlers
      
        mongoose.connection.on("error", (err) => console.error(err));
        mongoose.connection.on('connected', () => console.log('successfully connected to MONGODB!'));
        mongoose.connection.on('disconnected', () => {
            console.log('MONGODB Disconnected!');
            connection = null;
        });

           connection = await mongoose.connect(uri, options)
    return connection;
    } 
      } catch (error) {
    throw error;
  }
 
}


export default connectToDb;