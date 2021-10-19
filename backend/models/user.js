const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({

    age: { type: Number, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    profession: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String },
    phone: { type: String },

    products: [ String ], 
    interaction: [ String ],

    personalizedOptions: [ String ],

});

module.exports = mongoose.model('User', UserSchema);
