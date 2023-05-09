const { Dog, Temperament } = require("../db.js");

const createDog = async ({
	name,
	image,
	heightMin,
	heightMax,
	weightMin,
	weightMax,
	life_span,
	temperament,
}) => {
	const newDog = await Dog.create({
		name,
		image: image ? image : "https://imgur.com/FbCzXDP.png", // Si no se envía una imagen, se asigna una por defecto
		heightMin,
		heightMax,
		weightMin,
		weightMax,
		life_span: life_span ? life_span : "unknown", // Si no se envía una vida promedio, se asigna 'unknown' por defecto
	});

	const getTemperament = await Temperament.findAll({
		where: {
			id: temperament,
		},
	}); // Buscamos los temperamentos que se enviaron en el body

	newDog.addTemperament(getTemperament); // Asignamos los temperamentos al perro creado

	return newDog; // Retornamos el perro creado
};

module.exports = createDog;
