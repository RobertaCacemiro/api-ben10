const Serie = require("../models/Series");

// Listar
exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const [series, total] = await Promise.all([
      Serie.find().skip(skip).limit(limit).sort({ startYear: -1 }), // opcional
      Serie.countDocuments(),
    ]);

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: series,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao listar séries",
    });
  }
};

// Criar
exports.create = async (req, res) => {
  const { name, description, startYear, endYear } = req.body;

  // validação
  if (!name || !description || !startYear) {
    return res.status(400).json({
      message: "Nome, descrição e ano de início são obrigatórios",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Imagem da série é obrigatória",
    });
  }

  try {
    const serie = await Serie.create({
      name,
      description,
      startYear,
      endYear,
      imageUrl: req.file.path,
    });

    return res.status(201).json({
      success: true,
      message: "Novo documento adicionado.",
      data: serie,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
};

// Atualizar tudo
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, startYear, endYear } = req.body;

  // validação
  if (!name || !description || !startYear) {
    return res.status(400).json({
      message: "Nome, descrição e ano de início são obrigatórios",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Imagem da série é obrigatória",
    });
  }

  try {
    const serie = await Serie.findByIdAndUpdate(
      id,
      {
        name,
        description,
        startYear,
        endYear,
        imageUrl: req.file.path,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!serie) {
      return res.status(404).json({
        message: "Série não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Série atualizada com sucesso",
      data: serie,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
};

// Atualiza informaçoes passadas
exports.patch = async (req, res) => {
  const { id } = req.params;

  const updates = {
    ...req.body,
  };

  // se vier imagem, atualiza
  if (req.file) {
    updates.imageUrl = req.file.path;
  }

  try {
    const serie = await Serie.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      context: "query", // importante para validators
    });

    if (!serie) {
      return res.status(404).json({
        success: false,
        message: "Série não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Série atualizada parcialmente com sucesso",
      data: serie,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
};

// Remover
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const serie = await Serie.findByIdAndDelete(id);

    if (!serie) {
      return res.status(404).json({
        success: false,
        message: "Série não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Série removida com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
};
