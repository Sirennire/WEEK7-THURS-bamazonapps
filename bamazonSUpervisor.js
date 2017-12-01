var mysql = require ("mysql");
var inquirer = require ("inquirer");
var consoleTable = require ("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  prompt();
});

function prompt(){
    inquirer
    .prompt ([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"],
        name: "chooseAdventure"
      }
    ]).then(function (answer){
        switch(answer.chooseAdventure){

          case "View Products For Sale":
          displayItems();
          break;

          case "View Low Inventory":
          lowInventory();
          break;

          case "Add to Inventory":
          addInventory();
          break;

          case "Add New Product":
          addProduct();
          break;
        }
    });
}
