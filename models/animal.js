const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    habitat: {
        type: String,
        required: true
    },
    health: {
        type: String,
        required: true
    },
    feedingSchedule: {
        type: String,
        required: true
    },
    caretaker: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Animal', AnimalSchema);
