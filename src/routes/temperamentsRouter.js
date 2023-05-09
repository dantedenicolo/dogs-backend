const getTemperaments = require("../handlers/temperamentsHandlers");
const { Router } = require("express");
const temperamentsRouter = Router();

// Si la ruta solicitada es '/temperaments', se ejecuta la función importada getTemperaments
temperamentsRouter.get("/", getTemperaments);

module.exports = temperamentsRouter;
