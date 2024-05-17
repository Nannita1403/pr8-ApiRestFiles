const jwt = require("jsonwebtoken");

// me sirve para crear la Llave o Token para Auth
const generateKey = (id)=> {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1y" });
};

// funcion para comprobar si la llave la creamos nosotros
const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
module.exports = {generateKey, verifyJWT} 