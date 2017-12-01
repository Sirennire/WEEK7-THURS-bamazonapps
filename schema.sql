CREATE DATABASE bamazonDB;

USE DATABASE bamazonDB;

CREATE TABLE products (
	id INTEGER AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
	dept VARCHAR(50),
	price DECIMAL (6,2),
	stock INTEGER,
	sales DECIMAL (10,2),
	PRIMARY KEY (id)
);

INSERT INTO products (name, dept, price, stock)
VALUES ("Hearthstone Pack Bundle", 'gaming', 49.99, 10000), ('Cat Genie Sani-Solution', 'home care', 24.99, 100), ('Bit O Honey', 'groceries', 0.99, 500), ('Jurassic Park Poster', 'entertainment', 19.99, 200), ('Voluspa Candle', 'home decor', 18.99, 300), ('Head Girl Ravenclaw Pin', 'accessories', 7.99, 1000), ('Boxed Water Case of 30', 'groceries', 27.99, 5000), ('Mischief Managed Harry Potter socks', 'clothing', 1.99, 375), ('My Pillow', 'home decor', 19.99, 1500), ('Givenchy Mandarin Bolero Lip Stick', 'beauty', 32.00, 1000);

CREATE TABLE departments (
	id INTEGER AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL, 
	ohc DECIMAL (6,0),
	PRIMARY KEY (id)
);

DESCRIBE products;
SELECT * FROM products; 
