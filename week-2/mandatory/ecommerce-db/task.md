# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and make sure you understand all the SQL code. Take a piece of paper and draw the database with the different relations between tables. Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers names and addresses who lives in United States

```sql
select name, address from customers where country = 'United States';

```

2. Retrieve all the customers ordered by ascending name

```sql
select * from customers ORDER BY  name;

```

3. Retrieve all the products which cost more than 100

```sql
select * from products where unit_price > 100 ;

```

4. Retrieve all the products whose name contains the word `socks`

```sql
select * from products where product_name like '%socks%';

```

5. Retrieve the 5 most expensive products

```sql
select * from products order by unit_price DESC limit 5;

```

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

```sql
select
    p.product_name,
    p.unit_price,
    s.supplier_name
from products p
inner join suppliers s on s.id = p.supplier_id
;

```

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

```sql
select
    p.product_name,
    s.supplier_name
from products p
inner join suppliers s on s.id = p.supplier_id
where s.country = 'United Kingdom'
;

```

8. Retrieve all orders from customer ID `1`

```sql
select
*
from orders o
inner join customers c on c.id = o.customer_id
where c.id = 1
;

```

9. Retrieve all orders from customer named `Hope Crosby`

```sql
select
*
from orders o
inner join customers c on c.id = o.customer_id
where c.name = 'Hope Crosby'
;

```

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

```sql
select
p.product_name,
p.unit_price,
oi.quantity
from order_items oi
inner join orders o on o.id = oi.order_id
inner join products p on p.id = oi.product_id
where o.order_reference = 'ORD006'
;
```

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.

```sql
select
c.name,
o.order_reference,
o.order_date,
p.product_name,
s.supplier_name,
oi.quantity
from order_items oi
inner join orders o on o.id = oi.order_id
inner join products p on p.id = oi.product_id
inner join suppliers s on s.id = p.supplier_id
inner join customers c on c.id = o.customer_id
;
```

12. Retrieve the names of all customers who bought a product from a supplier from China.

```sql
select
c.name
from order_items oi
inner join orders o on o.id = oi.order_id
inner join products p on p.id = oi.product_id
inner join suppliers s on s.id = p.supplier_id
inner join customers c on c.id = o.customer_id
where s.country = 'China'
;
```
