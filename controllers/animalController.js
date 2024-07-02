const Animal = require('../models/animal');

exports.getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addAnimal = async (req, res) => {
    const { name, species, health, feedingSchedule } = req.body;

    try {
        const animal = new Animal({ name, species, health, feedingSchedule });
        const createdAnimal = await animal.save();
        res.status(201).json(createdAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
