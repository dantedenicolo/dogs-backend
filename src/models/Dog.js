const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"dog",
		{
			id: {
				type: DataTypes.UUID, // Tipo de dato, en este caso un UUID ya que necesitamos un ID único
				defaultValue: DataTypes.UUIDV4, // Genera un UUID aleatorio como valor por defecto
				primaryKey: true, // Es la primary key, es decir, la clave única que identifica a cada fila de la tabla
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			heightMin: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			heightMax: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			weightMin: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			weightMax: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			life_span: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			timestamps: false, // Evitamos que se creen los atributos createdAt y updatedAt
		}
	);
};
