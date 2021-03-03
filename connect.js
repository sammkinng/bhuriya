const mongoose =require('mongoose');                                                                                                                                 
const url="mongodb+srv://sammkinng:PRince123@cluster0.uipa3.mongodb.net/bhuria?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

// let _db;
// module.exports = {
//     getDb,
//     initDb
// };
// function initDb(callback) {
//     if (_db) {
//         console.warn("Trying to init DB again!");
//         return callback(null, _db);
//     }
//     mongoose.connect(url,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//         useCreateIndex:true
//     }).then(()=>{
//         console.log('coneection success');
//         return callback(null,_db);
//     }).catch((e)=>{
//         console.log(e);
//     });
// }

// function getDb() {
//     // assert.ok(_db, "Db has not been initialized. Please called init first.");
//     return _db;
// }

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('coneection success');
}).catch((e)=>{
    console.log(e);
});