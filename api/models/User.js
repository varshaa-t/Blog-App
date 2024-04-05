import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
    password: {
        type: String, 
        min: 8,
        required: true,
    },
});

export const UserModel = new mongoose.model('User', userSchema);

/*

// Dropped the old unique index on 'username' field
UserModel.collection.dropIndex('username_1', function(err, result) {
    if (err) {
        console.error('Error dropping index:', err);
    } else {
        console.log('Old index dropped:', result);
    }
});

// Created a new unique index on 'email' field
UserModel.collection.createIndex({ "email": 1 }, { unique: true }, function(err, result) {
    if (err) {
        console.error('Error creating index:', err);
    } else {
        console.log('New index created:', result);
    }
});

*/