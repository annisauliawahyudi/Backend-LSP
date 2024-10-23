
const KUK = require('../models/KUK.js'); 

exports.getAllKUKs = async (req, res) => {
    try {
        const kuks = await KUK.findAll();
        res.status(200).json(kuks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching KUKs", error });
    }
};

exports.createKUK = async (req, res) => {
    try {
        const newKUK = await KUK.create(req.body);
        res.status(201).json(newKUK);
    } catch (error) {
        res.status(400).json({ message: "Error creating KUK", error });
    }
};

exports.updateKUK = async (req, res) => {
    try {
        const { id } = req.params;
        await KUK.update(req.body, { where: { id } });
        res.status(200).json({ message: "KUK updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error updating KUK", error });
    }
};

exports.deleteKUK = async (req, res) => {
    try {
        const { id } = req.params;
        await KUK.destroy({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: "Error deleting KUK", error });
    }
};
