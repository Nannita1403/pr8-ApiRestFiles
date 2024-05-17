const { privateDecrypt } = require("crypto");
const Game = require("../models/games");
const { deleteFile } = require("../../utils/deletefiles");

const getGames = async (req,res,next) => {
    try {
        const games = await Game.find({ verified: true });
        return res.status(200).json(games);
      } catch (error) {
        return res.status(400).json("Error en la busqueda");
      }
    };

const getGameById = async (req,res,next) => {
    try {
        const {id}= req.params;
        const game = await Game.findById(id);
        return res.status(200).json(game);
     } catch (error) {
        return res.status(400).json("Error en la busqueda por ID");
     }
};

const getGameByCategory = async (req,res,next) => {
    try {
        const {category}= req.params;
        const games = await Game.find({category:category});
        return res.status(200).json(games);
     } catch (error) {
        return res.status(400).json("Error en la busqueda por Category");
     }
};

const postGame = async (req, res, next) => {
  try {
    const newGame = new Game(req.body);
    if(req.file) {
      newGame.imagen = req.file.path; //aca verifico si hay un nuevo archivo por el path (ruta a cloudinary)
    }
    if (req.user.rol === "admin") {
      newGame.verified = true;
    } else {
      newGame.verified = false;
    }
    const gameSaved = await newGame.save();

    return res.status(201).json(gameSaved);
  } catch (error) {
    return res.status(400).json("Error en la carga del Game");
  }
};

const getGameByAdmin = async (req, res, next) => {
    try {
      const games = await Game.find({ verified: false });
      return res.status(200).json(games);
    } catch (error) {
      return res.status(400).json("Error en la busqueda por Admin");
    }
  };

  const getGamesByPrice = async (req, res, next) => {
    try {
      const { precio } = req.params;
      const games = await Game.find({ Price: { $lte: precio } });
      return res.status(200).json(games);
    } catch (error) {
      return res.status(400).json("Error en la solicitud de busueda por Precio");
    }
  };

const updateGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      const newGame = new Game(req.body);
      newGame._id = id;
      
      if (req.file) {
        newGame.imagen = req.file.path; //aca lo que hago es sustituir la imagen en BBDD pero cargo una nueva en Cloud
        const oldGame = await Game.findById(id);
        deleteFile(oldGame.imagen);
      }

      const gameUpdated = await Game.findByIdAndUpdate(id, newGame, {
        new: true,
      });
      return res.status(200).json(gameUpdated);
    } catch (error) {
      return res.status(400).json("Error en el Update del Game");
    }
  };

  const deleteGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      const gameDeleted = await Game.findByIdAndDelete(id);
      deleteFile(gameDeleted.imagen);
      return res.status(200).json(gameDeleted);
    } catch (error) {
      return res.status(400).json("Error en la eliminación");
    }
  };
        module.exports = {
            getGames,
            getGameById, 
            getGamesByPrice,
            getGameByCategory,
            getGameByAdmin,
            postGame,
            updateGame,
            deleteGame
        }