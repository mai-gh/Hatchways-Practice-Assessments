const express = require("express");
const app = express();
//app.use(express.json());
const path = require("path");
const morgan = require('morgan');
app.use(morgan('dev'));
const PORT = 3000;


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.use(express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
