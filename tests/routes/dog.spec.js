/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
	name: "Pug",
	heightMin: 25,
	heightMax: 30,
	weightMin: 10,
	weightMax: 15,
	life_span: 10,
	image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
	temperament: [1, 2, 3],
};

describe("Videogame routes", () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error("Unable to connect to the database:", err);
		})
	);
	beforeEach(() => Dog.sync({ alter: true }).then(() => Dog.create(dog)));
	describe("GET /dogs", () => {
		it("should get 200", () => agent.get("/dogs").expect(200));
	});
});
