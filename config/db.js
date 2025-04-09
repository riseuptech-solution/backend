const mongoose=require('mongoose')
const dbConfig=async()=>{

try {
   await mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`); 
} catch (error) {
    console.log(error.message)
}
}
dbConfig()

exports.module=dbConfig