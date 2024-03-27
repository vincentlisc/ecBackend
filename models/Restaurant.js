const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    restaurant : {type:String, required: true, unique:true},
    email : {type:String, required:true, lowercase:true},
    password : {type:String, required:true},
    role: { type: String, enum: ['owner', 'manager','receptionalist'], lowercase:true}
})

export default mongoose.model('Restaurant', RestaurantSchema);

