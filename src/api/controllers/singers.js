const { privateDecrypt } = require("crypto");
const { deleteFile } = require("../../utils/deletefiles");
const Singer = require("../models/singers");

const getSingers = async (req,res,next) => {
    try {
        const singers = await Singer.find(/*{ verified: true }*/).populate("songs");
        return res.status(200).json(singers);
      } catch (error) {
        return res.status(400).json("Error en la busqueda");
      }
    };

const getSingerById = async (req,res,next) => {
    try {
        const {id}= req.params;
        const singer = await Singer.findById(id).populate("songs");
        return res.status(200).json(singer);
     } catch (error) {
        return res.status(400).json("Error en la busqueda por ID");
     }
};

const postSinger = async (req, res, next) => {
  try {
    const newSinger = new Singer(req.body);
    if (req.file) {
      newSinger.imagen = req.file.path;
    }
    const singerSaved = await newSinger.save();

    return res.status(201).json(singerSaved);
  } catch (error) {
    return res.status(400).json("Error en la carga del Plataform");
  }
};

const getSingerByAdmin = async (req, res, next) => {
    try {
      const singers = await Singer.find({ verified: false });
      return res.status(200).json(singers);
    } catch (error) {
      return res.status(400).json("Error en la busqueda por Admin");
    }
  };

const updateSinger = async (req, res, next) => {
    try {
      const { id } = req.params;
      const oldSinger = await Singer.findById(id);
      const newSinger = new Singer(req.body);
      newSinger._id = id;
      const songs = req.body.songs || [];
      newSinger.songs =[...oldSinger.songs, ...songs]

      if (req.file) {
        newSinger.imagen = req.file.path;
        deleteFile(oldSinger.imagen);
      }
      const singerUpdated = await Singer.findByIdAndUpdate(id, newSinger, {
        new: true,
      });
      return res.status(200).json(singerUpdated);
    } catch (error) {
      return res.status(400).json("Error en el Update  Plataform");
    }
  };

  const deleteSinger = async (req, res, next) => {
    try {
      const { id } = req.params;
      const singerDeleted = await Singer.findByIdAndDelete(id);
      deleteFile(singerDeleted.imagen);
      return res.status(200).json(singerDeleted);
    } catch (error) {
      return res.status(400).json("Error en la eliminación");
    }
  };
        module.exports = {
            getSingers,
            getSingerById, 
            getSingerByAdmin,
            postSinger,
            updateSinger,
            deleteSinger
        }