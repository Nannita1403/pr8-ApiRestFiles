const mongoose = require("mongoose");
const games = require("../data/games");
const Game = require("../api/models/games");

    mongoose
    .connect(process.env.DB_URL)
    .then (async()=> {
        const allGames = await Game.find();
        if(allGames.length >0){
            await Game.collection.drop();
        }
        await Game.insertMany(games);
        console.log("Error creando la Data: ${errÇ");
    })
    .finally(() => { mongoose.disconnect();
    });