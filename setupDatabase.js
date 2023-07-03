const { Client } = require("pg");
const { DB } = require("./config");

(async () => {

    const usersTableStatement = `
        CREATE TABLE IF NOT EXISTS users (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        email           VARCHAR(50),
        passwordHash    TEXT,
        firstName       VARCHAR(50),
        lastName        VARCHAR(50)
        );
    `

    const productsTableStatement = `
        CREATE TABLE IF NOT EXISTS products (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        name            VARCHAR(50)       NOT NULL,
        price           DECIMAL(10,2)     NOT NULL,
        description     VARCHAR(200)      NOT NULL
        );
    `

    const ordersTableStatement = `
        CREATE TABLE IF NOT EXISTS orders (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        total           INT               NOT NULL,
        status          VARCHAR(50)       NOT NULL,
        created         DATE              NOT NULL,
        modified        DATE              NOT NULL,
        userId          INT               NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
        );
    `

    const orderItemsTableStatement = `
        CREATE TABLE IF NOT EXISTS orderItems (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        qty             INT               NOT NULL,
        created         DATE              NOT NULL,
        price           DECIMAL(10,2)     NOT NULL,
        name            VARCHAR(50)       NOT NULL,
        description     VARCHAR(200)      NOT NULL,
        orderId         INT               NOT NULL,
        productId       INT               NOT NULL,
        FOREIGN KEY (orderId) REFERENCES orders(id),
        FOREIGN KEY (productId) REFERENCES products(id)
        );
    `

    const cartsTableStatement = `
        CREATE TABLE IF NOT EXISTS carts (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,       
        created         DATE              NOT NULL,
        modified        DATE              NOT NULL,
        userId          INT               NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
        );
    `

    const cartItemsTableStatement = `
        CREATE TABLE IF NOT EXISTS cartItems (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        qty             INT               NOT NULL,
        productId       INT               NOT NULL,
        cartId          INT               NOT NULL,
        FOREIGN KEY (cartId) REFERENCES carts(id),
        FOREIGN KEY (productId) REFERENCES products(id)
        );
    `

    // const insertProducts = `
    //   INSERT INTO products (name, price, description)
    //     VALUES ('Water Bottle', 10.10, 'Bottle for drinking water'); 
    // `

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

        await db.end();

    } catch (err) {
        console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
    }
    
})();