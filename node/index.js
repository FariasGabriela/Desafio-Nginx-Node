const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 8080;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const connection = mysql.createConnection(config);

let listDescricao = [];

connection.connect();
const sql1 = `INSERT INTO registro(descricao) values ('Evento de Natal');`;
const sql2 = `INSERT INTO registro(descricao) values ('Pascoa Solidária')`;
const sql3 = `INSERT INTO registro(descricao) values ('Dia das mães')`;
connection.query(sql1);
connection.query(sql2);
connection.query(sql3);

connection.query(
  "SELECT id AS id, descricao AS descricao FROM registro",
  function (error, results, fields) {
    if (error) throw error;
    results.forEach((item) => {
      listDescricao.push(item);
    });
  }
);

connection.end();

app.get("/", (req, res) => {
  const title = "<h1>Full Cycle 2!!!</h1> <br />";
  const table = '<table border="1">';
  const coluna = "<tr> <td>Id</td><td>Descrição</td> </tr>";
  let linhas = "";
  listDescricao.forEach((item) => {
    linhas += `<tr> <td>${item.id}</td> <td>${item.descricao}</td> </tr>`;
  });

  const tableFim = '</table border="1">';
  res.send(title + table + coluna + linhas + tableFim);
});

app.listen(port, () => {
  console.log("Rondando na porta" + port);
});
