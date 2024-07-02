const express = require('express');
const { getAnimals, addAnimal } = require('../controllers/animalController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getAnimals);
router.post('/', protect, authorize(['Admin', 'Zookeeper']), addAnimal);

module.exports = router;
