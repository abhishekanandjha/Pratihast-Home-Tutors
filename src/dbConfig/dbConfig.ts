import mongoose from "mongoose";

export async function Connect() {
    try{
        await mongoose.connect(process.env.MONGO_URI!); //!is that it can not be null i will make sure
        const connection = mongoose.connection;
        connection.on('connect',()=>{
            console.log('mongodb connected successfully');
        })

        connection.on('error',(err)=>{
            console.log('mongodb connected error =>' + err);
            process.exit();
        })


    }catch(e){
        console.log('Something  wrong with mongodb error => '+ e);
        console.log(e);
    }
}