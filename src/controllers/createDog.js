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
	// Creamos un nuevo perro con los datos enviados en el body
	const newDog = await Dog.create({
		name,
		image: image ? image : "https://imgur.com/FbCzXDP.png", // Si no se envía una imagen, se asigna una por defecto
		heightMin,
		heightMax,
		weightMin,
		weightMax,
		life_span: life_span ? life_span : "unknown", // Si no se envía una vida promedio, se asigna 'unknown' por defecto
	});

	// Buscamos los temperamentos que se enviaron en el body
	const getTemperament = await Temperament.findAll({
		where: {
			id: temperament,
		},
	});

	// Asignamos los temperamentos al perro creado
	newDog.addTemperament(getTemperament);

	// Retornamos el perro creado
	return newDog;
};

module.exports = createDog;
