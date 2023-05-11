const formatDogs = require("../controllers/formatDogs");
const createDog = require("../controllers/createDog");
const updateDog = require("../controllers/updateDog");
const deleteDog = require("../controllers/deleteDog");

const getDogs = async (req, res) => {
	const { name } = req.query; // Desestructuramos el query enviado en la URL
	try {
		const dogs = await formatDogs(); // Obtenemos los perros formateados
		if (name) {
			// Si se envía un query en la URL, filtramos los perros por el nombre enviado
			const dogsByName = await dogs.filter((dog) => {
				return dog.name.toLowerCase().includes(name.toLowerCase());
				// Filtramos los perros por el nombre enviado. Usamos toLowerCase() para que no haya problemas con las mayúsculas y minúsculas.
			});
			if (dogsByName.length) {
				// Si hay perros con ese nombre, los retornamos
				return res.status(200).json(dogsByName);
			} else {
				// Si no hay perros con ese nombre, retornamos un mensaje de error
				return res.status(404).json({ message: "Dog not found." });
			}
		} else {
			// Si no se envía un query en la URL, retornamos todos los perros
			return res.status(200).json(dogs);
		}
	} catch (error) {
		return res.status(500).json({ message: "Internal server error." });
	}
};

const getDogById = async (req, res) => {
	const { id } = req.params; // Desestructuramos el id enviado en los params
	try {
		const dogs = await formatDogs(); // Obtenemos los perros formateados
		const dogById = await dogs.find((dog) => dog.id == id); // Buscamos el perro por el id enviado
		if (dogById) {
			// Si se encuentra el perro, lo retornamos
			return res.status(200).json(dogById);
		} else {
			// Si no se encuentra el perro, retornamos un mensaje de error
			return res.status(404).json({ message: "Dog not found." });
		}
	} catch (error) {
		return res.status(500).json({ message: "Internal server error." });
	}
};

const postDog = async (req, res) => {
	// Desestructuramos los datos enviados en el body
	const {
		name,
		image,
		heightMin,
		heightMax,
		weightMin,
		weightMax,
		life_span,
		temperament,
	} = req.body;
	try {
		const newDog = await createDog({
			// Creamos el perro
			name,
			image,
			heightMin,
			heightMax,
			weightMin,
			weightMax,
			life_span,
			temperament,
		});
		if (newDog.message) {
			// Si hay un error, retornamos un mensaje de error
			return res.status(400).json({ message: newDog.message });
		} else {
			// Si se crea el perro, lo retornamos
			return res.status(200).json(newDog);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error." });
	}
};

const putDog = async (req, res) => {
	const { id } = req.params; // Desestructuramos el id enviado en los params
	// Desestructuramos los datos enviados en el body
	const {
		name,
		image,
		heightMin,
		heightMax,
		weightMin,
		weightMax,
		life_span,
		temperament,
	} = req.body;
	try {
		const update = await updateDog({
			// Actualizamos el perro
			id,
			name,
			image,
			heightMin,
			heightMax,
			weightMin,
			weightMax,
			life_span,
			temperament,
		});
		if (update.message) {
			// Si hay un error, retornamos un mensaje de error
			return res.status(400).json({ message: update.message });
		} else {
			// Si se actualiza el perro, lo retornamos
			return res.status(200).json(update);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error." });
	}
};

const deleteDogById = async (req, res) => {
	const { id } = req.params; // Desestructuramos el id enviado en los params
	try {
		const dog = await deleteDog(id); // Eliminamos el perro
		if (dog) {
			// Si se elimina el perro, lo retornamos
			return res.status(200).json(dog);
		} else {
			// Si no se encuentra el perro, retornamos un mensaje de error
			return res.status(404).json({ message: "Dog not found." });
		}
	} catch (error) {
		return res.status(500).json({ message: "Internal server error." });
	}
};

module.exports = {
	getDogs,
	getDogById,
	postDog,
	putDog,
	deleteDogById,
};
