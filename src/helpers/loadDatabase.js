const { Temperament } = require("../db.js");
const axios = require("axios");

const loadDatabase = async () => {
	try {
		const checkTemperaments = await Temperament.findAll(); // Buscamos si ya existen temperamentos en la base de datos
		// Si no existen temperamentos, los creamos
		if (!checkTemperaments.length) {
			// Obtenemos los perros de la api
			const fetchApi = await axios.get("https://api.thedogapi.com/v1/breeds");
			// Mapeamos los temperamentos
			const temperaments = fetchApi.data.map((dog) => {
				return { name: dog.temperament };
			});

			// Separamos los nombres de los temperamentos en un array
			const temperamentsArray = temperaments.map((temp) =>
				temp.name?.split(", ")
			);
			// Unimos todos los temperamentos en un solo array
			const temperamentsInOneArray = temperamentsArray.join(",").split(",");
			// Eliminamos los temperamentos duplicados
			const removeDuplicates = [...new Set(temperamentsInOneArray)];
			// Preparamos los temperamentos para enviarlos a la base de datos
			const temperamentsToDatabase = removeDuplicates.map((temp) => {
				return { name: temp };
			});
			// Enviamos los temperamentos a la base de datos
			await Temperament.bulkCreate(temperamentsToDatabase);
			// Eliminamos los temperamentos que no tienen nombre
			await Temperament.destroy({
				where: {
					name: null || "",
				},
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = loadDatabase;
