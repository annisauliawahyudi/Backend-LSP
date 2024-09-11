const { Skema, JenisSkema, ModeSkema } = require('../models');

exports.getSkema = async (req, res,) => {
  try{
    const skemas = await Skema.findAll({
      include: [
        {
          model: JenisSkema,
          as: 'jenis_skema1',
          attributes: ['id', 'jenis_skema']
        },
        {
          model: ModeSkema,
          as:'mode_skema1',
          attributes: ['id','mode_skema']
        }
      ],
    });

    if (skemas.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Test",
      data: skemas,
    })
  } catch (error){
    console.log(error);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.storeSkema = async (req, res) => {
  try {
    let{
      kode_skema,
      judul_skema,
      bidang,
      standar_kompetensi,
      dokumen_skema,
      dokumen_standar_kompetensi
    } = req.body;
    const addSkema = await Skema.create({
      kode_skema,
      judul_skema,
      bidang,
      standar_kompetensi,
      dokumen_skema,
      dokumen_standar_kompetensi
    });
    res.status(201).json({
      status: 201,
      message: "Customer Successfully Created",
      data: addCustomer,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};

exports.updateSkema = async (req, res) => {
  try {
    const  id  = req.params.id;

    const [updated] = await Skema.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedSkema = await Skema.findByPk(id);

      return res.status(200).json({
        status: 200,
        message: "Data Updated",
        data: updatedSkema,
      });
    }

    return res.status(404).json({
      status: 404,
      message: "Data not found",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};

exports.deleteSkema = async (req, res) => {
  try {
    const id = req.params.id;

    const idSkema = await Skema.findByPk(id);

    if (!idSkema) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }

    await Skema.destroy({
      where: {
        id,
      },
    })
    return res.status(200).json({
      status: 200,
      message: "Data Deleted",
      data: idCustomer,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error
    })
  }
}

exports.getIdSkema = async (req, res) => {
  try {
    const id = req.params.id;
    const skema = await Skema.findByPk(id);

    if (!skema) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }
    
    return res.status(200).json({
      status: 200,
      message: "Data",
      data: customer
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error
    })
  }
}



// const SkemaController = {
//   // Get all skema
//   async getAll(req, res) {
//     try {
//       const skemas = await Skema.findAll();
//       res.json(skemas);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },


//   // Get skema by ID
//   async getById(req, res) {
//     try {
//       const skema = await Skema.findByPk(req.params.id);
//       if (!skema) {
//         return res.status(404).json({ error: "Skema tidak ditemukan" });
//       }
//       res.json(skema);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   // Create new skema
//   async create(req, res) {
//     try {
//       const skema = await Skema.create(req.body);
//       res.status(201).json(skema);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },

//   // Update skema
//   async update(req, res) {
//     try {
//       const skema = await Skema.findByPk(req.params.id);
//       if (!skema) {
//         return res.status(404).json({ error: "Skema tidak ditemukan" });
//       }
//       await skema.update(req.body);
//       res.json(skema);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },

//   // Delete skema
//   async delete(req, res) {
//     try {
//       const skema = await Skema.findByPk(req.params.id);
//       if (!skema) {
//         return res.status(404).json({ error: "Skema tidak ditemukan" });
//       }
//       await skema.destroy();
//       res.status(204).json({ message: "Skema berhasil dihapus" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
// };

// module.exports = SkemaController;
