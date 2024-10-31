import mongoose from "mongoose";

const ConnectDB = async () => {
    try {

        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/collaborative-todo`);

        const host = connect.connection.host;
        console.log(`Database connected Successfully.\nConnection Host - ${ host }`);
        
    } catch (error) {
        console.log("Something went wrong in connecting mongodb", error);
    }
}

export { ConnectDB };