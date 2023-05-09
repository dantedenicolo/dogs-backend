const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
module.exports = (sequelize) => {
	sequelize.define(
		"temperament", // Nombre del modelo
		{
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			timestamps: false, // Evitamos que se creen los atributos createdAt y updatedAt
		}
	);
};
