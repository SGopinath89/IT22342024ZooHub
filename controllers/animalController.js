const Animal = require('../models/Animal');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

exports.getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addAnimal = [
    upload.single('image'),
    async (req, res) => {
        const { name, species, age, habitat, health, feedingSchedule, caretaker } = req.body;
        const image = req.file.path;

        try {
            const animal = new Animal({
                name,
                species,
                age,
                habitat,
                health,
                feedingSchedule,
                caretaker,
                image
            });
            const createdAnimal = await animal.save();
            res.status(201).json(createdAnimal);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

exports.updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { name, species, age, habitat, health, feedingSchedule, caretaker } = req.body;

    try {
        const animal = await Animal.findById(id);
        if (!animal) return res.status(404).json({ message: 'Animal not found' });

        animal.name = name;
        animal.species = species;
        animal.age = age;
        animal.habitat = habitat;
        animal.health = health;
        animal.feedingSchedule = feedingSchedule;
        animal.caretaker = caretaker;

        const updatedAnimal = await animal.save();
        res.json(updatedAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAnimal = async (req, res) => {
    const { id } = req.params;

    try {
        await Animal.findByIdAndRemove(id);
        res.json({ message: 'Animal deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
