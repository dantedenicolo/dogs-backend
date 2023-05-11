const { Dog } = require("../db.js");

const deleteDog = async (id) => {
	const dog = await Dog.findByPk(id); // Buscamos el perro por id
	await dog.destroy(); // Eliminamos el perro

	return dog; // Retornamos el perro eliminado
};

module.exports = deleteDog;
