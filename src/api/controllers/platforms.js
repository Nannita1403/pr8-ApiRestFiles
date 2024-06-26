const { privateDecrypt } = require("crypto");
const { deleteFile } = require("../../utils/deletefiles");
const Platform = require("../models/platforms");

const getPlatforms = async (req,res,next) => {
    try {
        const platforms = await Platform.find().populate("games");
        return res.status(200).json(platforms);
      } catch (error) {
        return res.status(400).json("Error en la busqueda");
      }
    };

const getPlatformById = async (req,res,next) => {
    try {
        const {id}= req.params;
        const platform = await Platform.findById(id).populate("games");
        return res.status(200).json(platform);
     } catch (error) {
        return res.status(400).json("Error en la busqueda por ID");
     }
};

const postPlatform = async (req, res, next) => {
  try {
    const newPlatform = new Platform(req.body);
    if (req.file) {
      newPlatform.imagen = req.file.path;
    }
    const platformSaved = await newPlatform.save();

    return res.status(201).json(platformSaved);
  } catch (error) {
    return res.status(400).json("Error en la carga del Plataform");
  }
};

const updatePlatform = async (req, res, next) => {
    try {
      const { id } = req.params;
      const oldPlatform = await Platform.findById(id);
      const newPlatform = new Platform(req.body);
      newPlatform._id = id;
      const games = req.body.games || [];
      newPlatform.games =[...oldPlatform.games, ...games]

      if (req.file) {
        newPlatform.imagen = req.file.path;
        deleteFile(oldPlatform.imagen);
      }
      const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, {
        new: true,
      });
      return res.status(200).json({mensaje:"Plataforma Actualizada", platformUpdated});
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  const deletePlatform = async (req, res, next) => {
    try {
      const { id } = req.params;
      const platformDeleted = await Platform.findByIdAndDelete(id);
      deleteFile(platformDeleted.imagen);
      return res.status(200).json({mensaje:"Plataforma Eliminada", platformDeleted});
    } catch (error) {
      return res.status(400).json("Error en la eliminación");
    }
  };
        module.exports = {
            getPlatforms,
            getPlatformById,
            postPlatform,
            updatePlatform,
            deletePlatform
        }