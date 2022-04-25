const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./server");

chai.use(chaiHttp);

const allRecipes = {
  recipeNames: ["scrambledEggs", "garlicPasta", "chai"],
};

const garlicPastaDetails = {
  details: {
    ingredients: ["500mL water", "100g spaghetti", "25mL olive oil", "4 cloves garlic", "Salt"],
    numSteps: 5,
  },
};

const garlicPastaRecipe = {
  name: "garlicPasta",
  ingredients: [],
  Instructions: [],
};

const butteredBagel = {
  name: "butteredBagel",
  ingredients: ["1 bagel", "butter"],
  instructions: ["cut the bagel", "spread butter on bagel"],
};

describe("Back End Testing", () => {
  it("GET /recipes", async () => {
    const res = await chai.request(app).get("/recipes");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(allRecipes);
  });

  it("GET /recipes/details/garlicPasta ", async () => {
    const res = await chai.request(app).get("/recipes/details/garlicPasta");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(garlicPastaDetails);
  });

  it("GET /recipes/details/thisDoesNotExist", async () => {
    const correctResponseJson = {};
    const res = await chai.request(app).get("/recipes/details/thisDoesNotExist");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({});
  });

  it("POST /recipes not already existing", async () => {
    const res = await chai.request(app).post("/recipes").send(butteredBagel);
    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal({});
  });

  it("POST /recipes already existing", async () => {
    const res = await chai.request(app).post("/recipes").send(garlicPastaRecipe);
    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ error: "Recipe already exists" });
  });

  it("PUT /recipes already existing", async () => {
    const res = await chai.request(app).put("/recipes").send(garlicPastaRecipe);
    expect(res.status).to.equal(204);
    expect(res.body).to.deep.equal({});
  });

  it("PUT /recipes not already existing", async () => {
    const res = await chai.request(app).put("/recipes").send(butteredBagel);
    expect(res.status).to.equal(404);
    expect(res.body).to.deep.equal({ error: "Recipe does not exist" });
  });
});
