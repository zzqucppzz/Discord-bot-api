const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4 : uuid } = require('uuid');

const Student = new Schema({
    /*
    _id: {
        type: String,
        required: true,
        default: () => uuid,
    },
    */
    username: {
        type: String,
        required: [true, 'Must provide an username!!'],
        minLength: [1, 'Min char: 1'],
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
        /*
        validate: {
            validator: v => v % 2 === 0,
            messageL props => `${props.value} is not an even number`
        } //only run when use save or create
        */
    },
    email: {
        type: String,
        //required: [true, 'Must provide an email!!'],
        minLength: [10, 'Min char: 10'],        
        lowercase: true,
    },
    user_type: {
        type: String,
        required: () => {
            return this.user_type === 'discord' || this.user_type === 'github';
        },
        minLength: [1, 'Min char: 1'],       
    },
    createdAt: {
        type: Date,
        immutable: true, 
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date, 
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('Student', Student);