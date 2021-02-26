const mongoose =require('mongoose');                                                                                                                                 
const url="mongodb+srv://sammkinng:PRince123@cluster0.uipa3.mongodb.net/bhuria?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";


mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('coneection success');
}).catch((e)=>{
    console.log(e);
});