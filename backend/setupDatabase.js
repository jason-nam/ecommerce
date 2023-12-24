const { Client } = require("pg");
const { DB } = require("./config");

const { faker } = require('@faker-js/faker');

(async () => {

    const usersTableStatement = `
        CREATE TABLE IF NOT EXISTS users (
            id              SERIAL            PRIMARY KEY,
            email           VARCHAR(50)       NOT NULL,
            password        TEXT              NOT NULL,
            firstname       VARCHAR(50),
            lastname        VARCHAR(50),
            isactive        BOOLEAN,
            ship_first_name TEXT,
            ship_last_name  TEXT,
            addr_line_1     TEXT,
            addr_line_2     TEXT,
            addr_city       TEXT,
            addr_province   TEXT,
            addr_country    TEXT,
            addr_postal     TEXT,
            phone_number    TEXT,
            UNIQUE(email)
        );
    `

    const shippingTableStatement = `
        CREATE TABLE IF NOT EXISTS shipping (
            id              SERIAL            PRIMARY KEY,
            userid          INT,
            first_name      TEXT,
            last_name       TEXT,
            addr_line_1     TEXT,
            addr_line_2     TEXT,
            addr_city       TEXT,
            addr_province   TEXT,
            addr_country    TEXT,
            addr_postal     TEXT,
            phone_number    TEXT,
            FOREIGN KEY (userid) REFERENCES users(id)
        )
    `

    const paymentsTableStatement = `
        CREATE TABLE IF NOT EXISTS payments (
            id              SERIAL            PRIMARY KEY,
            userid          INT,
            name_on_card    TEXT              NOT NULL,
            addr_line_1     TEXT              NOT NULL,
            addr_line_2     TEXT,
            addr_city       TEXT              NOT NULL,
            addr_province   TEXT              NOT NULL,
            addr_postal     TEXT              NOT NULL,
            phone_number    TEXT,
            encrypted_card  TEXT              NOT NULL,
            encrypted_exp   TEXT              NOT NULL,
            FOREIGN KEY (userid) REFERENCES users(id)
        );
    `

    const billingTableStatement = `
        CREATE TABLE IF NOT EXISTS billings (
            id              SERIAL            PRIMARY KEY,
            userid          INT               NOT NULL,
            paymentid       INT               NOT NULL,
            amount          DECIMAL(10, 2)    NOT NULL,
            payment_date    TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
            payment_status  VARCHAR(20)       NOT NULL,
            FOREIGN KEY (userid) REFERENCES users(id),
            FOREIGN KEY (paymentid) REFERENCES payments(id)
        );
    `

    const categoriesTableStatement = `
        CREATE TABLE IF NOT EXISTS categories (
            id              SERIAL            PRIMARY KEY,
            name            VARCHAR(50)       NOT NULL
        );
    `

    const subcategoriesTableStatement = `
        CREATE TABLE IF NOT EXISTS subcategories (
            id              SERIAL            PRIMARY KEY,
            name            VARCHAR(50)       NOT NULL,
            categoryid      INT               NOT NULL,
            FOREIGN KEY (categoryid) REFERENCES categories(id)
        );
    `

    const productsTableStatement = `
        CREATE TABLE IF NOT EXISTS products (
            id              SERIAL            PRIMARY KEY,
            name            VARCHAR(50)       NOT NULL,
            price           DECIMAL(10,2)     NOT NULL,
            description     VARCHAR(300)      NOT NULL, 
            subcategoryid   INT               NOT NULL,
            FOREIGN KEY (subcategoryid) REFERENCES subcategories(id)
        );
    `

    const imagesTableStatement = `
        CREATE TABLE IF NOT EXISTS images (
            id              SERIAL            PRIMARY KEY,
            productid       INT,
            image           VARCHAR(200)      NOT NULL,
            FOREIGN KEY (productid) REFERENCES products(id)
        );
    `

    const ordersTableStatement = `
        CREATE TABLE IF NOT EXISTS orders (
            id              SERIAL            PRIMARY KEY,
            userid          INT,
            total           DECIMAL(10,2)     NOT NULL,
            status          VARCHAR(50)       NOT NULL,
            created         TIMESTAMP         NOT NULL,
            modified        TIMESTAMP         NOT NULL,
            FOREIGN KEY (userid) REFERENCES users(id)
        );
    `

    const orderItemsTableStatement = `
        CREATE TABLE IF NOT EXISTS orderitems (
            id              SERIAL            PRIMARY KEY,
            qty             INT               NOT NULL,
            created         TIMESTAMP         NOT NULL,
            orderid         INT               NOT NULL,
            productid       INT               NOT NULL,
            FOREIGN KEY (orderid) REFERENCES orders(id),
            FOREIGN KEY (productid) REFERENCES products(id)
        );
    `

    const cartsTableStatement = `
        CREATE TABLE IF NOT EXISTS carts (
            id              SERIAL            PRIMARY KEY,      
            created         TIMESTAMP         NOT NULL,
            modified        TIMESTAMP         NOT NULL,
            userid          INT               NOT NULL,
            FOREIGN KEY (userid) REFERENCES users(id)
        );
    `

    const cartItemsTableStatement = `
        CREATE TABLE IF NOT EXISTS cartitems (
            id              SERIAL            PRIMARY KEY,
            qty             INT               NOT NULL,
            productid       INT               NOT NULL,
            cartid          INT               NOT NULL,
            FOREIGN KEY (cartid) REFERENCES carts(id),
            FOREIGN KEY (productid) REFERENCES products(id),
            UNIQUE(productid)
        );
    `
    
    const insertCategories = `
        INSERT INTO categories (name)
        VALUES ($1) 
        RETURNING *
    `;

    const insertSubcategories = `
        INSERT INTO subcategories (name, categoryid)
        VALUES ($1, $2)
        RETURNING *
    `;

    const insertProducts = `
        INSERT INTO products (name, price, description, subcategoryid)
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `;

    const insertImages = `
        INSERT INTO images (productid, image)
        VALUES ($1, $2)
        RETURNING *
    `;

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
        await db.query(paymentsTableStatement);
        await db.query(shippingTableStatement);
        await db.query(billingTableStatement);
        await db.query(categoriesTableStatement);
        await db.query(subcategoriesTableStatement);
        await db.query(productsTableStatement);
        await db.query(imagesTableStatement);
        await db.query(ordersTableStatement);
        await db.query(orderItemsTableStatement);
        await db.query(cartsTableStatement);
        await db.query(cartItemsTableStatement);

        // Sample Database
        const categoriesList = ["Men", "Women", "Children"];
        const insertedCategories = [];
        
        for (const categoryName of categoriesList) {
            const categoryResult = await db.query(insertCategories, [categoryName]);
            insertedCategories.push(categoryResult.rows[0]);
        }

        console.log('Categories inserted:', insertedCategories);

        const subcategoriesMap = {
            Men: ["Tops", "Bottoms", "Outerwear", "Innerwear", "Accessories"],
            Women: ["Tops", "Bottoms", "Dresses and Skirts", "Outerwear", "Innerwear", "Accessories"],
            Children: ["Tops", "Bottoms", "Dresses and Skirts", "Outerwear", "Innerwear", "Accessories"]
        };

        // Insert subcategories and build a subcategory ID map
        const subcategoryIdMap = {};
      
        for (const category of insertedCategories) {
            const subcategoriesList = subcategoriesMap[category.name];
            for (const subcategoryName of subcategoriesList) {
                const subcategoryResult = await db.query(insertSubcategories, [subcategoryName, category.id]);
                subcategoryIdMap[subcategoryResult.rows[0].id] = [subcategoryResult.rows[0].name, category.name];
            }
        }

        console.log('Subcategories inserted:', subcategoryIdMap);

        const insertedProducts = [];

        for (let i = 0; i < 120; i++) {
            const subcategoryNames = Object.keys(subcategoriesMap).flatMap(name => subcategoriesMap[name]);
            const randomIndex = Math.floor(Math.random() * subcategoryNames.length) + 1;
            // const randomSubcategoryName = subcategoryNames[randomIndex];
            // const subcategoryId = subcategoryIdMap[randomSubcategoryName];

            const values = [
                faker.commerce.productName(), 
                faker.commerce.price({ max: 100 }),
                faker.commerce.productDescription(),
                // faker.image.urlLoremFlickr({ category: 'hat,whitebackground', width: 1000, height: 1000, randomize: true}),
                randomIndex
            ]
            const productsResult = await db.query(insertProducts, values);
            insertedProducts.push(productsResult.rows[0]);
        }
        console.log("Products inserted:", insertedProducts);

        const insertedImages = [];
        for (const product of insertedProducts) {
            for (let i = 0; i < 5; i++) {
                const values = [
                    product.id, 
                    faker.image.urlLoremFlickr({ category: 'shoes,whitebackground', width: 1000, height: 1000, randomize: true})
                ];
                const imagesResult = await db.query(insertImages, values);
                insertedImages.push(imagesResult.rows[0]);
            }
        }
        console.log("Images inserted:", insertedImages);

        await db.end();

    } catch (err) {
        console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
    }
    
})();