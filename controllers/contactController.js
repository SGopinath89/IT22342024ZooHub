const Contact = require('../models/contact');

exports.sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const contact = new Contact({ name, email, message });
        const savedContact = await contact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
