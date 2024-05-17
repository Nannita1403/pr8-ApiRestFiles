const cloudinary = require ("cloudinary").v2;

//? recibo una URL y lo que me permite es tranformarla en un archivo para eliminarla
const  deleteFile= (url) => {
    //const imgUrl = "https://res.cloudinary.com/diprtuiin/image/upload/v1715950224/Games/rm1lgwdoxnmdvprpvcxl.jpg";
    // separamos por cada separacion entre /

    const imgSplited = url.split("/");
    const folderName = imgSplited.at(-2); //Encuentro la carpeta es el array de atras para adelante ej:"Games"
    //Ultima posicion del array y separamos desde el . para quitar el elemento y luego lo que hay antes [0]
    const fileName = imgSplited.at(-1).split(".")[0]; 
    
    cloudinary.uploader.destroy(`${folderName}/${fileName}`, () => {
        console.log("Se ha destruido");
    })
}

module.exports ={deleteFile}