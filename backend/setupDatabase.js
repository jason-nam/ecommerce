const { Client } = require("pg");
const { DB } = require("./config");

const { faker } = require('@faker-js/faker');

(async () => {

    const usersTableStatement = `
        CREATE TABLE IF NOT EXISTS users (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        email           VARCHAR(50),
        password        TEXT,
        firstname       VARCHAR(50),
        lastname        VARCHAR(50)
        );
    `

    const productsTableStatement = `
        CREATE TABLE IF NOT EXISTS products (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        name            VARCHAR(50)       NOT NULL,
        price           DECIMAL(10,2)     NOT NULL,
        description     VARCHAR(300)      NOT NULL,
        category        VARCHAR(50)       NOT NULL,
        image           VARCHAR(200)      NOT NULL
        );
    `

    const ordersTableStatement = `
        CREATE TABLE IF NOT EXISTS orders (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        total           INT               NOT NULL,
        status          VARCHAR(50)       NOT NULL,
        created         DATE              NOT NULL,
        modified        DATE              NOT NULL,
        userid          INT               NOT NULL,
        FOREIGN KEY (userid) REFERENCES users(id)
        );
    `

    const orderItemsTableStatement = `
        CREATE TABLE IF NOT EXISTS orderitems (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        qty             INT               NOT NULL,
        created         DATE              NOT NULL,
        price           DECIMAL(10,2)     NOT NULL,
        name            VARCHAR(50)       NOT NULL,
        description     VARCHAR(200)      NOT NULL,
        orderid         INT               NOT NULL,
        productid       INT               NOT NULL,
        FOREIGN KEY (orderid) REFERENCES orders(id),
        FOREIGN KEY (productid) REFERENCES products(id)
        );
    `

    const cartsTableStatement = `
        CREATE TABLE IF NOT EXISTS carts (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,       
        created         DATE              NOT NULL,
        modified        DATE              NOT NULL,
        userid          INT               NOT NULL,
        FOREIGN KEY (userid) REFERENCES users(id)
        );
    `

    const cartItemsTableStatement = `
        CREATE TABLE IF NOT EXISTS cartitems (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        qty             INT               NOT NULL,
        productid       INT               NOT NULL,
        cartid          INT               NOT NULL,
        FOREIGN KEY (cartid) REFERENCES carts(id),
        FOREIGN KEY (productid) REFERENCES products(id)
        );
    `
    const insertProducts = `
        INSERT INTO products (name, price, description, category, image)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    try {
        const db = new Client({
        user: DB.PGUSER,
        host: DB.PGHOST,
        database: DB.PGDATABASE,
        password: DB.PGPASSWORD,
        port: DB.PGPORT
        });

        await db.connect();

        // create tables on db
        await db.query(usersTableStatement);
        await db.query(productsTableStatement);
        await db.query(ordersTableStatement);
        await db.query(orderItemsTableStatement);
        await db.query(cartsTableStatement);
        await db.query(cartItemsTableStatement);

        // await db.query(insertProducts);
        for (let i=0; i<20; i++) {
            const values = [faker.commerce.productName(), 
                faker.commerce.price({ max: 100 }),
                faker.commerce.productDescription(),
                faker.commerce.department(),
                faker.image.urlLoremFlickr({ category: 'city' })       
            ]
            await db.query(insertProducts, values);
        }
    

        await db.end();

    } catch (err) {
        console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
    }
    
})();