const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "idkfaiddqd",
  port: 5432,
});
const api = () => {
  const getProducts = async (request, response) => {
    const productName = request.query.name;
    //IT'S CASE SENSITIVE
    if (productName) {
      const productByName = await pool.query(
        `select 
        p.product_name, 
        s.supplier_name 
        from products p
        inner join suppliers s on s.id = p.supplier_id
        where p.product_name = $1`,
        [productName]
      );
      return response.status(200).json(productByName.rows);
    }
    const products = await pool.query(
      `select 
        p.product_name, 
        s.supplier_name 
        from products p
        inner join suppliers s on s.id = p.supplier_id
        `
    );
    return response.status(200).json(products.rows);
  };
  const getCustomerById = async (request, response) => {
    const customerId = request.params.customerId;
    const customer = await pool.query(
      `select 
        *
        from customers c
        where c.id = $1 `,
      [customerId]
    );
    return response.status(200).json(customer.rows);
  };

  const postNewCustomer = async (request, response) => {
    const newCustomer = request.body;
    console.log(newCustomer);
    const result = await pool.query(
      `INSERT INTO customers (name, address, city, country ) VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        newCustomer.name,
        newCustomer.address,
        newCustomer.city,
        newCustomer.country,
      ]
    );
    const responseBody = { customerId: result.rows[0].id };
    return response.status(201).json(responseBody);
  };
  const postNewProduct = async (request, response) => {
    const newProduct = request.body;
    const newSupplierId = newProduct.supplier_id;
    const supplierSearch = await pool.query(
      `SELECT * FROM suppliers WHERE id=$1`,
      [newSupplierId]
    );
    if (!Number.isInteger(newProduct.unit_price)) {
      return response
        .status(400)
        .send("Unit Price should be a positive integer");
    } else if (supplierSearch.rows.length === 0) {
      return response
        .status(400)
        .json({ message: "Supplier not in Database!" });
    }
    const result = await pool.query(
      `INSERT INTO products (product_name, unit_price, supplier_id ) VALUES ($1, $2, $3) RETURNING id`,
      [newProduct.product_name, newProduct.unit_price, newProduct.supplier_id]
    );
    const responseBody = { productId: result.rows[0].id };
    return response.status(201).json(responseBody);
  };
  const postNewOrder = async (request, response) => {
    const newOrder = request.body;
    const customerId = request.params.customerId;
    const poolQuery = await pool.query("SELECT * FROM customers WHERE id=$1", [
      customerId,
    ]);
    if (poolQuery.rows.length === 0) {
      return response.status(400).send("Customer with that Id doesn't exist!");
    }
    const result = await pool.query(
      `INSERT INTO orders (order_date, order_reference ) VALUES ($1, $2) RETURNING id`,
      [newOrder.order_date, newOrder.order_reference]
    );
    const responseBody = { orderId: result.rows[0].id };
    return response.status(201).json(responseBody);
  };
  const putCustomer = async (request, response) => {
    const customerId = request.params.customerId;

    const newName = request.body.name;
    const newAddress = request.body.address;
    const newCity = request.body.city;
    const newCountry = request.body.country;

    await pool.query(
      `UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5`,
      [newName, newAddress, newCity, newCountry, customerId]
    );
    return response.status(201).send(`Customer ${customerId} updated!`);
  };
  const deleteOrder = async (request, response) => {
    const orderId = request.params.orderId;

    await pool.query("DELETE FROM orders WHERE id=$1", [orderId]);
    return response.status(201).send(`Order ${orderId} deleted!`);
  };

  const deleteCustomer = async (request, response) => {
    const customerId = request.params.customerId;

    const customerOrderLookOut = await pool.query(
      `SELECT * from orders where customer_id=$1`,
      [customerId]
    );
    console.log(customerOrderLookOut.length);
    if (customerOrderLookOut) {
      return response
        .status(400)
        .send(`Customer ${customerId} has existing orders`);
    } else {
      await pool.query("DELETE FROM customers WHERE id=$1", [customerId]);
      return response.status(201).send(`Customer ${customerId} deleted!`);
    }
  };
  const getCustomerOrderItems = async (request, response) => {
    const customerId = request.params.customerId;
    const customer = await pool.query(
      `select 
            o.order_reference,
            o.order_date,
            p.product_name,
            p.unit_price,
            s.supplier_name,
            oi.quantity
            from order_items oi
            inner join orders o on o.id = oi.order_id
            inner join customers c on c.id = o.customer_id
            inner join products p on p.id = oi.product_id
            inner join suppliers s on s.id = p.supplier_id
            where c.id = $1`,
      [customerId]
    );
    return response.status(200).json(customer.rows);
  };

  return {
    getProducts,
    getCustomerById,
    postNewCustomer,
    postNewProduct,
    postNewOrder,
    putCustomer,
    deleteOrder,
    deleteCustomer,
    getCustomerOrderItems,
  };
};

module.exports = api;
