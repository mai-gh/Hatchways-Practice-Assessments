const express = require("express");
const app = express();
app.use(express.json());
//const morgan = require('morgan');
//app.use(morgan('dev'));
const PORT = 3000;
let jsonData = require("./data.json");

const recipeNames = jsonData.recipes.map((r) => r.name);

app.get("/recipes", async (req, res, next) => {
  try {
    res.send({ recipeNames });
  } catch (ex) {
    next(ex);
  }
});

app.get("/recipes/details/:name", async (req, res, next) => {
  try {
    if (recipeNames.filter((n) => n == req.params.name).length === 1) {
      const [recipe] = jsonData.recipes.filter(
        (r) => r.name === req.params.name
      );
      const details = {
        ingredients: recipe.ingredients,
        numSteps: recipe.instructions.length,
      };
      res.status = 200;
      res.send({ details });
    } else {
      res.status = 200;
      res.send({});
    }
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
});

app.post("/recipes", async (req, res, next) => {
  try {
    if (recipeNames.filter((n) => n == req.body.name).length === 0) {
      res.sendStatus(201);
    } else {
      res.status(400);
      res.send({ error: "Recipe already exists" });
    }
  } catch (ex) {
    next(ex);
  }
});

app.put("/recipes", async (req, res, next) => {
  try {
    if (recipeNames.filter((n) => n == req.body.name).length === 1) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send({ error: "Recipe does not exist" });
    }
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
