const { generateKey } = require("../../config/jwt");
const User = require("../models/users");
const bcrypt = require("bcrypt");

//para registrarse los usuarios
const registerUser = async (req,res,next) => {
    try {
       const newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        rol: "user", //todos SERAN user automaticamente SOLO un admin puede modificarlo
        imagen: req.body.imagen,
        email: req.body.email,
    });
        //evito la duplicacion de los usuarios
       const userUnique = await User.findOne( 
        {userName:req.body.userName});
        if(userUnique){
            return res.status(400).json("Busca otro user");
        }
    
       const userSaved = await newUser.save();
       return res.status(201).json({mensaje:"Usuario Creado", userSaved});
    } catch (error) {
        return res.status(400).json ("Error en el registro")
    }
}

//para que el admin pueda usarlo para ver los usuarios:
const getUsers = async (req,res,next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json ("Error no hay Usuarios")
    }
}

const loginUser = async (req,res,next) => {
    try {
        const user = await User.findOne( 
            {userName:req.body.userName});
            if (!user) {
                return res.status(400).json("Usuario sin existencia");
            }
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const token = generateKey(user._id);
                return res.status(200).json({user, token});
            } else {
                return res.status(400).json("La contraseña no es correcta")
            }
    } catch (error) {
        return res.status(400).json ("Error en el login")
    }
};
const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userDeleted = await User.findByIdAndDelete(id);
      return res.status(200).json({ mensaje:"Usuario Eliminado", userDeleted });
    } catch (error) {
      return res.status(400).json("Error en la eliminación");
    }
  };


module.exports = {getUsers, registerUser, loginUser, deleteUser}