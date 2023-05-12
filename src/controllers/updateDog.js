const { Dog, Temperament } = require("../db.js");

const updateDog = async ({
	id,
	name,
	image,
	heightMin,
	heightMax,
	weightMin,
	weightMax,
	life_span,
	temperament,
}) => {
	// Actualizamos el perro con los datos enviados en el body
	const updateDog = await Dog.update(
		{
			name,
			image: image || "https://imgur.com/FbCzXDP.png", // Si no se envía una imagen, se asigna una por defecto
			heightMin,
			heightMax,
			weightMin,
			weightMax,
			life_span: life_span || "unknown", // Si no se envía una vida promedio, se asigna 'unknown' por defecto
		},
		{
			where: {
				id,
			},
		}
	);

	const getTemperament = await Temperament.findAll({
		where: {
			id: temperament,
		},
	}); // Buscamos los temperamentos que se enviaron en el body

	// Eliminamos los temperamentos del perro
	const dog = await Dog.findByPk(id);
	await dog.setTemperaments([]);

	// Asignamos los nuevos temperamentos al perro
	await dog.addTemperament(getTemperament);

	return dog; // Retornamos el perro creado
};

module.exports = updateDog;
