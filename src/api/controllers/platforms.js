const { privateDecrypt } = require("crypto");
const Platform = require("../models/platforms");

const getPlatforms = async (req,res,next) => {
    try {
        const platforms = await Platform.find(/*{ verified: true }*/).populate("games");
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
/*
    if (req.user.rol === "admin") {
      newPlataform.verified = true;
    } else {
      newPlataform.verified = false;
    }*/
    const platformSaved = await newPlatform.save();

    return res.status(201).json(platformSaved);
  } catch (error) {
    return res.status(400).json("Error en la carga del Plataform");
  }
};

const getPlatformByAdmin = async (req, res, next) => {
    try {
      const platforms = await Platform.find({ verified: false });
      return res.status(200).json(platforms);
    } catch (error) {
      return res.status(400).json("Error en la busqueda por Admin");
    }
  };

const updatePlatform = async (req, res, next) => {
    try {
      const { id } = req.params;
      const oldPlatform = await Platform.findById(id);
      const newPlatform = new Platform(req.body);
      
      newPlatform._id = id;
      newPlatform.games =[...oldPlatform.games, ...req.body.games]
      const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, {
        new: true,
      });
      return res.status(200).json(platformUpdated);
    } catch (error) {
      return res.status(400).json("Error en el Update del Plataform");
    }
  };

  const deletePlatform = async (req, res, next) => {
    try {
      const { id } = req.params;
      const platformDeleted = await Platform.findByIdAndDelete(id);
      return res.status(200).json(platformDeleted);
    } catch (error) {
      return res.status(400).json("Error en la eliminación");
    }
  };
        module.exports = {
            getPlatforms,
            getPlatformById, 
            getPlatformByAdmin,
            postPlatform,
            updatePlatform,
            deletePlatform
        }