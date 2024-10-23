const { Unit, JudulUnit } = require('../models');

exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.findAll({
      include: [
        {
          model: JudulUnit,
          as: 'judul_unit',
          attributes: ['id', 'judul_unit']
        }
      ]
    });

    if (units.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Retrieved",
      data: units,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.storeUnit = async (req, res) => {
  try {
    const {
      kode_unit,
      judul_unit_id
    } = req.body;

    const addUnit = await Unit.create({
      kode_unit,
      judul_unit_id
    });

    res.status(201).json({
      status: 201,
      message: "Unit Successfully Created",
      data: addUnit,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await Unit.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedUnit = await Unit.findByPk(id);

      return res.status(200).json({
        status: 200,
        message: "Unit Updated",
        data: updatedUnit,
      });
    }

    return res.status(404).json({
      status: 404,
      message: "Unit not found",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const id = req.params.id;

    const unit = await Unit.findByPk(id);

    if (!unit) {
      return res.status(404).json({
        status: 404,
        message: "Unit not found",
      });
    }

    await Unit.destroy({
      where: { id },
    });

    return res.status(200).json({
      status: 200,
      message: "Unit Deleted",
      data: unit,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};

exports.getUnitById = async (req, res) => {
  try {
    const id = req.params.id;
    const unit = await Unit.findByPk(id, {
      include: [
        {
          model: JudulUnit,
          as: 'judul_unit',
          attributes: ['id', 'judul_unit']
        }
      ]
    });

    if (!unit) {
      return res.status(404).json({
        status: 404,
        message: "Unit not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Retrieved",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
