const { Temperament } = require("../db.js");

const getTemperaments = async (req, res) => {
	try {
		const temperaments = await Temperament.findAll(); // Obtenemos los temperamentos y los retornamos
		return res.status(200).json(temperaments);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error." });
	}
};

module.exports = getTemperaments;
