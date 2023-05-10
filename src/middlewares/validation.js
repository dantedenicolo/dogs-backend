const formatDogs = require("../controllers/formatDogs");

const validate = async (req, res, next) => {
	const {
		name,
		image,
		heightMin,
		heightMax,
		weightMin,
		weightMax,
		life_span,
		temperament,
	} = req.body; // Desestructuramos los datos enviados en el body

	if (!name) {
		// Si no se envía un nombre, retornamos un mensaje de error
		return res.status(400).json({ message: "Name is required." });
	}
	if (!heightMin) {
		// Si no se envía una altura mínima, retornamos un mensaje de error
		return res.status(400).json({ message: "Minimum height is required." });
	}
	if (!heightMax) {
		// Si no se envía una altura máxima, retornamos un mensaje de error
		return res.status(400).json({ message: "Maximum height is required." });
	}
	if (!weightMin) {
		// Si no se envía un peso mínimo, retornamos un mensaje de error
		return res.status(400).json({ message: "Minimum height is required." });
	}
	if (!weightMax) {
		// Si no se envía un peso máximo, retornamos un mensaje de error
		return res.status(400).json({ message: "Maximum height is required." });
	}

	if (name.length < 3) {
		// Si el nombre tiene menos de 3 caracteres, retornamos un mensaje de error
		return res
			.status(400)
			.json({ message: "Name must have at least 3 characters." });
	}
	if (name.length > 50) {
		// Si el nombre tiene más de 50 caracteres, retornamos un mensaje de error
		return res
			.status(400)
			.json({ message: "Name must have a maximum of 50 characters." });
	}
	if (weightMin > weightMax) {
		// Si el peso mínimo es mayor al peso máximo, retornamos un mensaje de error
		return res
			.status(400)
			.json({ message: "Minimum weight must be less than maximum weight." });
	}
	if (heightMin > heightMax) {
		// Si la altura mínima es mayor a la altura máxima, retornamos un mensaje de error
		return res
			.status(400)
			.json({ message: "Minimum height must be less than maximum height." });
	}
	if (heightMin > 129 || heightMin < 1) {
		// Si la altura mínima es mayor a 129, menor a 1 retornamos un mensaje de error
		console.log(heightMin);
		return res
			.status(400)
			.json({ message: "Please enter a valid minimum height." });
	}
	if (heightMax > 129 || heightMax < 1) {
		// Si la altura máxima es mayor a 129, menor a 1 retornamos un mensaje de error
		return res
			.status(400)
			.json({ message: "Please enter a valid maximum height." });
	}
	if (weightMin > 199 || weightMin < 1) {
		// Si el peso mínimo es mayor a 199, menor a 1 retornamos un mensaje de error
		return res
			.status(400)
			.json({ message: "Please enter a valid minimum weight." });
	}
	if (weightMax > 199 || weightMax < 1) {
		// Si el peso máximo es mayor a 199, menor a 1 retornamos un mensaje de error
		return res
			.status(400)
			.json({ message: "Please enter a valid maximum weight." });
	}
	if (life_span && (life_span > 35 || life_span < 1)) {
		// Si la vida promedio es mayor a 35, menor a 1 retornamos un mensaje de error
		return res.status(400).json({ message: "Please enter a valid life span." });
	}
	if (!temperament || temperament.length < 1) {
		// Si no se envía un temperamento, retornamos un mensaje de error
		return res
			.status(400)
			.json({ message: "Please select at least one temperament." });
	}

	const dogs = await formatDogs(); // Obtenemos los perros formateados

	if (dogs.find((dog) => dog.name.toLowerCase() === name.toLowerCase())) {
		// Si el nombre del perro ya existe, retornamos un mensaje de error
		return res.status(400).json({ message: "Dog already exists." });
	}

	next(); // Si pasa todas las validaciones, llamamos al siguiente middleware
};

module.exports = validate;
