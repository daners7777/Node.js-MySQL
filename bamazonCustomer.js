var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "meow",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  loadProducts();
});


var searchTerm = "";

// function prompt() {
    // inquirer
    //     .prompt([
    //         {
    //             type: "list",
    //             name: "command",
    //             message: "What would you like to do?",
    //             choices: ["What is the product id?"],
    //         },
    //     ])
    //   };
//       prompt();

function loadProducts() {
  connection.query("select * from products", function (err, res)
  {
    if (err) throw err;
    console.table(res)
    itemPurchase(res);
  })
}

function itemPurchase(inventory) {
  var products = [];
  for (var i = 0; i < inventory.length; i++) {
    console.log(inventory[i])
    products.push(inventory[i].product_name)
  }
  inquirer
  .prompt([
      {
          type: "list",
          name: "command",
          message: "What would you like to do?",
          choices: products,
      },
  ])
  .then(function(items){
    console.log(items)
  })
};
