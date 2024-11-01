const { PersyaratanAsesi, JenisPersyaratanAsesi, Skema } = require("../models");
const jenispersyaratanasesi = require("../models/jenispersyaratanasesi");

// Fungsi untuk mengirim respons
const sendResponse = (res, status, message, data) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

// Mengambil semua persyaratan asesi
exports.getAllPersyaratanAsesi = async (req, res) => {
  try {
    const persyaratanAsesi = await PersyaratanAsesi.findAll({
      include: [
        {
          model: JenisPersyaratanAsesi,
          as: "JenisPersyaratanAsesi",
          attributes: ["id", "jenis_persyaratan"],
        },
        {
          model: Skema,
          as: "skema",
          attributes: ["id", "judul_skema"],
        },
      ],
    });
    return sendResponse(res, 200, "Data Retrieved Successfully", persyaratanAsesi);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Internal Server Error", error.message || error);
  }
};

// Mengambil persyaratan asesi berdasarkan ID
exports.getPersyaratanAsesiById = async (req, res) => {
  const { id } = req.params;

  try {
    const persyaratanAsesi = await PersyaratanAsesi.findByPk(id, {
      include: [
        {
          model: JenisPersyaratanAsesi,
          as: "JenisPersyaratanAsesi",
          attributes: ["id", "jenis_persyaratan"],
        },
        {
          model: Skema,
          as: "skema",
          attributes: ["id", "judul_skema"],
        },
      ],
    });

    if (!persyaratanAsesi) {
      return sendResponse(res, 404, "Persyaratan Asesi not found");
    }
    return sendResponse(res, 200, "Data Retrieved Successfully", persyaratanAsesi);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Internal Server Error", error.message || error);
  }
};

// mengambil sesuai skema
exports.getPersyaratanAsesiBySkemaId = async (req, res) => {
  const skema_id = req.params.skema_id;

  try {
    const persyaratanAsesi = await PersyaratanAsesi.findAll({
      where: { skema_id: skema_id },
      include: [
        {
          model: JenisPersyaratanAsesi,
          as: "JenisPersyaratanAsesi",
          attributes: ["id", "jenis_persyaratan"],
        },
        {
          model: Skema,
          as: "skema",
          attributes: ["id", "judul_skema"],
        },
      ],
    });

    if (persyaratanAsesi.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No Persyaratan Asesi found for this skema",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Retrieved Successfully",
      data: persyaratanAsesi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};


// Menyimpan persyaratan asesi baru
exports.storePersyaratanAsesi = async (req, res) => {
  try {
    const { skema_id } = req.params;
    const { persyaratan_asesi, jenis_persyaratan_id } = req.body;

    const existingJenisPersyaratanAsesi = await JenisPersyaratanAsesi.findOne({ where:{id:jenis_persyaratan_id}});
    if (existingJenisPersyaratanAsesi) {
      return res.status(400).json({
        status: 400,
        message: "jenis persyaratan does not exist",
      });
    }
    const existingPersyaratanAsesi = await PersyaratanAsesi.findOne({ where:{persyaratan_asesi}});
     if (existingPersyaratanAsesi) {
      return res.status(400).json({
        status: 400,
        message: "Persyaratan Asesi already exists",
      });
    }

    const addPersyaratanAsesi = await PersyaratanAsesi.create({
      persyaratan_asesi,
      jenis_persyaratan_id,
      skema_id,
    })
    return res.status(201).json({
      status: 201,
      message: `Persyaratan Asesi Successfully Created`,
      data: addPersyaratanAsesi,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error: error.message || error,
    });
  }
};

// Memperbarui persyaratan asesi
exports.updatePersyaratanAsesi = async (req, res) => {
  const { id } = req.params;
  const { persyaratan_asesi, jenis_persyaratan_id, skema_id } = req.body;

  // Validasi input
  if (!persyaratan_asesi || !jenis_persyaratan_id || !skema_id) {
    return sendResponse(res, 400, "All fields are required");
  }

  try {
    const persyaratanAsesi = await PersyaratanAsesi.findByPk(id);
    if (!persyaratanAsesi) {
      return sendResponse(res, 404, "Persyaratan Asesi not found");
    }

    persyaratanAsesi.persyaratan_asesi = persyaratan_asesi;
    persyaratanAsesi.jenis_persyaratan_id = jenis_persyaratan_id;
    // persyaratanAsesi.skema_id = skema_id;
    await persyaratanAsesi.save();
    return sendResponse(res, 200, "Persyaratan Asesi updated successfully", persyaratanAsesi);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Error updating Persyaratan Asesi", error.message || error);
  }
};

// Menghapus persyaratan asesi
exports.deletePersyaratanAsesi = async (req, res) => {
  const { id } = req.params;

  try {
    const persyaratanAsesi = await PersyaratanAsesi.findByPk(id);
    if (!persyaratanAsesi) {
      return sendResponse(res, 404, "Persyaratan Asesi not found");
    }

    await persyaratanAsesi.destroy();
    return sendResponse(res, 200, "Persyaratan Asesi deleted successfully", persyaratanAsesi);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Error deleting Persyaratan Asesi", error.message || error);
  }
};

exports.getJenisPersyaratan = async (req, res) => {
 try {
  const JenisPersyaratanAsesi = await JenisPersyaratanAsesi.findAll();

  if (JenisPersyaratanAsesi.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Data jenis persyaratan asesi",
      data: JenisPersyaratanAsesi,
    });
 } catch (error) {
  console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message || error,
    });
 }
}
