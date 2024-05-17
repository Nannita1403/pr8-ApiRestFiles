const { privateDecrypt } = require("crypto");
const Song = require("../models/songs");
const { deleteFile } = require("../../utils/deletefiles");

const getSongs = async (req,res,next) => {
    try {
        const songs = await Song.find({ verified: true });
        return res.status(200).json(songs);
      } catch (error) {
        return res.status(400).json("Error en la busqueda");
      }
    };

const getSongById = async (req,res,next) => {
    try {
        const {id}= req.params;
        const song = await Song.findById(id);
        return res.status(200).json(song);
     } catch (error) {
        return res.status(400).json("Error en la busqueda por ID");
     }
};

const getSongByCategory = async (req,res,next) => {
    try {
        const {category}= req.params;
        const songs = await Song.find({category:category});
        return res.status(200).json(songs);
     } catch (error) {
        return res.status(400).json("Error en la busqueda por Category");
     }
};

const getSongsByPrice = async (req, res, next) => {
    try {
      const { precio } = req.params;
      const songs = await Song.find({ Price: { $lte: precio } });
      return res.status(200).json(songs);
    } catch (error) {
      return res.status(400).json("Error en la solicitud de busueda por Precio");
    }
  };

const postSong = async (req, res, next) => {
  try {
    const newSong = new Song(req.body);
    if(req.file) {
      newSong.imagenDisco = req.file.path; //aca verifico si hay un nuevo archivo por el path (ruta a cloudinary)
    }
    if (req.user.rol === "admin") {
      newSong.verified = true;
    } else {
      newSong.verified = false;
    }
    const songSaved = await newSong.save();

    return res.status(201).json(songSaved);
  } catch (error) {
    return res.status(400).json("Error en la carga del Song");
  }
};

const getSongByAdmin = async (req, res, next) => {
    try {
      const songs = await Song.find({ verified: false });
      return res.status(200).json(songs);
    } catch (error) {
      return res.status(400).json("Error en la busqueda por Admin");
    }
  };

const updateSong = async (req, res, next) => {
    try {
      const { id } = req.params;
      const newSong = new Song(req.body);
      newSong._id = id;
      
      if (req.file) {
        newSong.imagenDisco = req.file.path; //aca lo que hago es sustituir la imagen en BBDD pero cargo una nueva en Cloud
        const oldSong = await Song.findById(id);
        deleteFile(oldSong.imagenDisco);
      }

      const songUpdated = await Song.findByIdAndUpdate(id, newSong, {
        new: true,
      });
      return res.status(200).json(songUpdated);
    } catch (error) {
      return res.status(400).json("Error en el Update del Song");
    }
  };

  const deleteSong = async (req, res, next) => {
    try {
      const { id } = req.params;
      const songDeleted = await Song.findByIdAndDelete(id);
      deleteFile(songDeleted.imagenDisco);
      return res.status(200).json(songDeleted);
    } catch (error) {
      return res.status(400).json("Error en la eliminación");
    }
  };
        module.exports = {
            getSongs,
            getSongById, 
            getSongByCategory,
            getSongsByPrice,
            getSongByAdmin,
            postSong,
            updateSong,
            deleteSong
        }