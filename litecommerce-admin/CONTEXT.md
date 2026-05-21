# Admin Context

Glossary for the LiteCommerce Admin frontend.

## Glossary

### Employee
A staff member who manages the system through the Admin portal. Must have at least the `employee` role to log in.

### Admin
An Employee with additional management permissions, designated by the `employee,admin` role string.

### Responsible Employee
The Employee who accepts an Order (transitions it to status 2). This employee is then responsible for the Order's subsequent lifecycle.

### Shipper
An external logistics company responsible for delivering the Order to the Customer.

### Cart
A session-based temporary storage for products before an Order is created. It is cleared upon logout or session expiration.

### Province
A fixed geographical region used for shipping and address details. New Orders must use a valid Province, but it is stored as text (snapshot) on the Order.

### Cover Photo
The primary image for a Product, stored in `Products.Photo`. (Note: The `ProductPhotos` table is currently a placeholder for future gallery expansion).

### Product Attribute
Structured additional information for a Product (e.g., "Weight: 1kg"). Displayed on the detail page.

### Price Filter
A mechanism to filter products based on a `minPrice` and `maxPrice`. Frontend buckets are mapped to these absolute numeric values.

### Order Deletion
Orders can only be deleted if they are in `New`, `Canceled`, or `Rejected` states (Status 1, -1, -2). Orders in `Accepted`, `Shipping`, or `Finished` states are protected from deletion.

### Sale Price
The price of a Product at the moment of order creation. It is snapshotted from the catalog `Price` and cannot be modified.

### Availability
The binary state of a Product. If `IsSelling` is `0`, the product cannot be added to any Carts or Orders.

### Customer Association
Every Order must be linked to a registered Customer ID. Admin-created orders for new people require first creating a Customer profile.

### Order Immutability
Once an Order is created, its line items (OrderDetails) cannot be edited. To change the requested items, the Order must be canceled and a new one created.

### Account
The authentication identity used by an Employee (Email and Password).
