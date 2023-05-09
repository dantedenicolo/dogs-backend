const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const formatDogs = async () => {
	// Hacemos la petición a la API y guardamos los perros obtenidos en una variable
	const apiDogs = await axios.get(
		`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
	);
	const formatApiDogs = apiDogs.data.map((dog) => {
		// Formateamos los datos de los perros obtenidos haciendo un map por cada perro
		return {
			id: dog.id,
			name: dog.name,
			image: dog.image,
			heightMin: dog.height.metric.split(" - ")[0],
			// Separamos los valores de altura en un array y obtenemos el valor mínimo a través de la posición 0
			heightMax: dog.height.metric.split(" - ")[1],
			// Separamos los valores de altura en un array y obtenemos el valor máximo a través de la posición 1
			weightMin: dog.weight.metric.split(" - ")[0],
			// Separamos los valores de peso en un array y obtenemos el valor mínimo a través de la posición 0
			weightMax: dog.weight.metric.split(" - ")[1],
			// Separamos los valores de peso en un array y obtenemos el valor máximo a través de la posición 1
			life_span: dog.life_span,
			temperament: dog.temperament
				? dog.temperament.split(", ").map((temp) => {
						return temp;
						// Si el perro tiene temperamentos, los separamos en un array y hacemos un map por cada uno
				  })
				: "unknown",
			// Si el perro no tiene temperamentos, asignamos 'unknown' como valor por defecto
			createdInDb: false,
		};
	});

	const dbDogs = await Dog.findAll({
		// Hacemos una búsqueda en la base de datos de todos los perros
		include: {
			// Incluimos los nombres de cada temperamento que tenga el perro
			model: Temperament,
			attributes: ["name"], // Solo queremos que se muestre el nombre del temperamento
			through: {
				attributes: [], // No queremos que se muestre información de la tabla intermedia
			},
		},
	});
	const formatDbDogs = dbDogs.map((dog) => {
		// Formateamos los datos de los perros obtenidos haciendo un map por cada perro
		return {
			id: dog.id,
			name: dog.name,
			image: dog.image,
			heightMin: dog.heightMin,
			heightMax: dog.heightMax,
			weightMin: dog.weightMin,
			weightMax: dog.weightMax,
			life_span: dog.life_span.concat(" years"), // Concatenamos la palabra 'years' al valor de life_span
			temperament: dog.temperaments.map((temp) => {
				// Hacemos un map por cada temperamento que tenga el perro
				return temp.name;
			}),
			createdInDb: true,
		};
	});

	return [...formatApiDogs, ...formatDbDogs]; // Retornamos un array con los todos los perros formateados
};

module.exports = formatDogs;
