const { Client } = require("pg");
const { DB } = require("./config");

(async () => {
    try {
        const db = new Client({
            user: DB.PGUSER,
            host: DB.PGHOST,
            database: DB.PGDATABASE,
            password: DB.PGPASSWORD,
            port: DB.PGPORT
        });

        await db.connect();

        // Drop tables from db
        await db.query('DROP TABLE IF EXISTS cartitems, orderitems, carts, orders, images, products, subcategories, categories, billings, shipping, payments, users');

        console.log('All tables deleted successfully');

        await db.end();
    } catch (err) {
        console.log("ERROR DELETING TABLES: ", err);
    }
})();
