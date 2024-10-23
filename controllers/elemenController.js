const { Elemen } = require('../models'); //

const getAllElemen = async (req, res) => {
  try {
    const elemen = await Elemen.findAll();
    res.status(200).json(elemen);
  } catch (error) {
    res.status(500).json({ message: 'Not Found', error });
  }
};

const editElemen = async (req, res) => {
  const { id } = req.params;
  const { Nama_Elemen } = req.body;
  
  try {
    const elemen = await Elemen.findByPk(id);
    if (!elemen) {
      return res.status(404).json({ message: 'Elemen not found' });
    }

    elemen.Nama_Elemen = Nama_Elemen; 
    await elemen.save();
    
    res.status(200).json({ message: 'Elemen updated successfully', elemen });
  } catch (error) {
    res.status(500).json({ message: 'Error updating elemen', error });
  }
};

const deleteElemen = async (req, res) => {
  const { id } = req.params;
  
  try {
    const elemen = await Elemen.findByPk(id);
    if (!elemen) {
      return res.status(404).json({ message: 'Elemen not found' });
    }

    await elemen.destroy();
    res.status(200).json({ message: 'Elemen deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting elemen', error });
  }
};

module.exports = {
  getAllElemen,
  editElemen,
  deleteElemen,
};
