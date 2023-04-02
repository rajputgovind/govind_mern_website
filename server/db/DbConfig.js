const mongoose =require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB)
.then(()=>{
    console.log("database connection successful....")
})
.catch((error)=>{
    console.log("error in connection")
    console.log(error)
})
















// sir ne bataya

//  async function createConn(){
//     try {
//         await mongoos.connect(DB)
//         console.log("connection Successful....")
        
//     } catch (error) {
//         console.log("error in connection...")
//         console.log(error)
//     }
// }

// module.exports = createConn