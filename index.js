require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  { SERVER_PORT, CONNECTION_STRING } = process.env,
  products_controller = require("./products_controller");
app = express();

app.use(express.json());

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne);
app.get("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.delete);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});
