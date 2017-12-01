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
  //console.log("connected as id " + connection.threadId + "\n");
  displayItems();
});

function displayItems(){
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    console.table(res);
    purchaseOption();
  });
}

function purchaseOption(){
    inquirer
    .prompt ([
      {
        type: "input",
        message: "What is the id of the item you would like to purchase?",
        name: "itemId"
      },
      {
        type: "input",
        message: "How many units would you like to buy?",
        name: "itemUnits"
      }
    ]).then(function (data){
        connection.query("SELECT * FROM products WHERE ?",
          {id: data.itemId},
          function(err, res){
              if(err) throw err;
              else if (data.itemUnits > res[0].stock){
              console.log("Not enough in stock!");
              }
              else if (data.itemUnits < res[0].stock){
              console.log("You've purchased " + data.itemUnits + " " + res[0].name + 's.');
              connection.query("UPDATE products SET ? WHERE ?",
                [
                  {
                    stock: res[0].stock - data.itemUnits
                  },{
                    id: data.itemId
                  }
                ],
              function(err, res){
              });
              connection.query("UPDATE products SET ? WHERE ?",
                [
                  {
                    sales: res[0].price * data.itemUnits
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
