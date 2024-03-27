const mongoose = require('mongoose');

const reservation = new mongoose.Schema({
    restaurantId : {type:String, required:true},
    dinerEmail : {type:String, lowercase:true, required:true},
    dinerName : {type:String, required:true},
    phone: {type:Number, required:true},
    date : {type:String, required:true},
    time : {type:String, required:true}
})

export default  mongoose.model("Reservation",reservation);