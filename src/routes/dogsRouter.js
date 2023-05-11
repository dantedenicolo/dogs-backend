const { Router } = require("express");
const validate = require("../middlewares/validation");
const updateValidate = require("../middlewares/updateValidation");
const {
	postDog,
	getDogs,
	getDogById,
	putDog,
	deleteDogById,
} = require("../handlers/dogsHandlers");
const dogsRouter = Router();

// Si la ruta solicitada es '/dogs', se ejecuta la función importada getDogs
dogsRouter.get("/", getDogs);

// Si la ruta solicitada es '/dogs/:id', se ejecuta la función importada getDogById
dogsRouter.get("/:id", getDogById);

// Si la ruta solicitada es '/dogs' y el método es POST, se valida el body con la funcion importada validate y luego la función importada postDog
dogsRouter.post("/", validate, postDog);

// Si la ruta solicitada es '/dogs/:id' y el método es PUT, se valida el body con la funcion importada validate y luego la función importada putDog
dogsRouter.put("/:id", updateValidate, putDog);

// Si la ruta solicitada es '/dogs/:id' y el método es DELETE, se ejecuta la función importada deleteDogById
dogsRouter.delete("/:id", deleteDogById);

module.exports = dogsRouter;
