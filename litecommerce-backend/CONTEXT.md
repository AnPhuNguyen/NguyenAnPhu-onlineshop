# Backend Context

Glossary for the LiteCommerce NestJS Backend.

## Glossary

### Customer
An entity representing a shopper in the database.

### Employee
An entity representing a staff member. Valid roles are exactly `employee` or `employee,admin`.

### Role String
A comma-separated string in the database (`employee` or `employee,admin`) that determines portal access and permissions.

### Responsible Employee
The Employee (ID) assigned to an Order upon acceptance. Only they (or an Admin) can perform further status transitions.

### Shipper
An entity representing an external delivery service.

### Province
A semi-static lookup value for addresses. Orders store the province name as a snapshot to preserve history.

### Cover Photo
The primary product image path.

### Product Attribute
A key-value pair providing extra structured data for a Product.

### Price Filter
A query constraint using `minPrice` and `maxPrice` numeric values.

### Order Deletion
Hard deletion constraint: blocked if Status is 2, 3, or 4.

### Sale Price
A snapshot of `Products.Price` stored in `OrderDetails`. Immutable after order creation.

### Customer Association
Strict requirement for a valid `CustomerID` on all `Orders`.

### Order Immutability
Once stored in `Orders` and `OrderDetails`, the product selection and quantities are read-only.

### Account
The authentication identity (Email/Password) shared by both Customers and Employees, differentiated by the table they reside in.
