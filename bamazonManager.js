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
        choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
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

function displayItems(){
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    console.table(res);
  });
}

function lowInventory(){
  connection.query("SELECT * FROM products WHERE stock < 5", function(err, res){
    if(err) throw err;
    console.table(res);
  });
}

function addInventory(){
  inquirer
  .prompt ([
    {
      type: "input",
      message: "What item Id would you like to add more of?",
      name: "itemId"
    },
    {
      type: "input",
      message: "How many would you like to add?",
      name: "itemUnits"
    }
  ]).then(function (data){
      connection.query("SELECT * FROM products WHERE ?",
        {id: data.itemId},
          function(err, res){
            if(err) throw err;
            if (data.itemUnits > -1){
            console.log("You've added " + data.itemUnits + " to " + res[0].name);
            connection.query("UPDATE products SET ? WHERE ?",
              [
                {
                  stock: parseFloat(res[0].stock) + parseFloat(data.itemUnits)
                },{
                  id: data.itemId
                }
              ],
            function(err, res){
            });
          }
    });
  });
}

function addProduct(){
  inquirer
  .prompt ([
    {
      type: "input",
      message: "What item would you like to add?",
      name: "itemName"
    },
    {
      type: "input",
      message: "What department will the item be listed in?",
      name: "itemDept"
    },
    {
      type: "input",
      message: "How much does the item cost?",
      name: "itemPrice"
    },
    {
      type: "input",
      message: "How many would you like to add?",
      name: "itemStock"
    }
  ]).then(function (ans){
    connection.query("INSERT INTO products (name, dept, price, stock) VALUES ('"+ans.itemName+"', '"+ans.itemDept+"', "+ans.itemPrice+", "+ans.itemStock+");", function(err, res){
      if(err) throw err;
      console.log("You've added " + ans.itemStock + " of " + ans.itemName);
    });
  });
}
