const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express");
});
//pg library
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyfhotels",
  password: "idkfaiddqd",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});
app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});
//stretch goal
// app.get("/products", function (req, res) {
//   pool.query("SELECT
//     p.name as product_name,
//     s.name as supplier_name
//     from products c
//     inner join suppliers s on s.id = p.supplier_id
//   ", (error, result) => {
//     res.json(result.rows);
//   });
// });

//pg script

app.listen(4000, () => console.log("Server is up and running"));
