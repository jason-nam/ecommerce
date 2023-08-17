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
        lastname        VARCHAR(50),
        isactive        BOOLEAN,
        UNIQUE(email)
        );
    `

    const categoriesTableStatement = `
        CREATE TABLE IF NOT EXISTS categories (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        name            VARCHAR(50)       NOT NULL
        );
    `

    const subcategoriesTableStatement = `
        CREATE TABLE IF NOT EXISTS subcategories (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        name            VARCHAR(50)       NOT NULL,
        categoryid      INT               NOT NULL,
        FOREIGN KEY (categoryid) REFERENCES categories(id)
        );
    `

    const productsTableStatement = `
        CREATE TABLE IF NOT EXISTS products (
        id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        name            VARCHAR(50)       NOT NULL,
        price           DECIMAL(10,2)     NOT NULL,
        description     VARCHAR(300)      NOT NULL,
        image           VARCHAR(200)      NOT NULL,
        subcategoryid   INT               NOT NULL,
        FOREIGN KEY (subcategoryid) REFERENCES subcategories(id)
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
        INSERT INTO products (name, price, description, image, subcategoryid)
        VALUES ($1, $2, $3, $4, $5) 
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
        await db.query(categoriesTableStatement);
        await db.query(subcategoriesTableStatement);
        await db.query(productsTableStatement);
        await db.query(ordersTableStatement);
        await db.query(orderItemsTableStatement);
        await db.query(cartsTableStatement);
        await db.query(cartItemsTableStatement);

        // await db.query(insertCategories);
        const categoriesList = ["Men", "Women", "Children"];
        const insertedCategories = [];
        // const subcategoriesList = ["Tops", "Bottoms", "Outerwear", "Innerwear", "Loungewear", "Accessories"];
        
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

        for (let i = 0; i < 60; i++) {
            const subcategoryNames = Object.keys(subcategoriesMap).flatMap(name => subcategoriesMap[name]);
            const randomIndex = Math.floor(Math.random() * subcategoryNames.length) + 1;
            // const randomSubcategoryName = subcategoryNames[randomIndex];
            // const subcategoryId = subcategoryIdMap[randomSubcategoryName];

            const values = [
                faker.commerce.productName(), 
                faker.commerce.price({ max: 100 }),
                faker.commerce.productDescription(),
                // faker.commerce.department(),
                faker.image.urlLoremFlickr({ category: 'shoes,whitebackground', width: 1000, height: 1000, randomize: false}),
                randomIndex
            ]
            const productsResult = await db.query(insertProducts, values);
            insertedProducts.push(productsResult.rows[0]);
        }

        console.log("Products inserted:", insertedProducts);

        await db.end();

    } catch (err) {
        console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
    }
    
})();