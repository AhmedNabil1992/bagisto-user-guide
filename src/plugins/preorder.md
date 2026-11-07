# Pre-Order Management

The Pre-Order module allows merchants to accept orders and collect payments for upcoming products, out-of-stock items, or custom-manufactured inventory before it arrives at your warehouse.

---

## 1. Enabling Pre-Order on a Product

1. Navigate to **Catalog >> Products** and open the product edit view.
2. Under the Pre-Order settings:
   - **Allow Pre-Order**: Enable this toggle.
   - **Pre-Order Quantity**: The maximum allocation of units available for pre-booking.
   - **Expected Availability Date**: The projected arrival date when order fulfilment begins.
3. Click **Save Product**.

---

## 2. Storefront Customer Experience

- On the product detail page, the standard "Add to Cart" button automatically transforms into a prominent **Pre-Order** call to action.
- The expected availability date is clearly displayed beside pricing so buyers know when their shipment will dispatch.
- Shoppers complete checkout through normal payment gateways or Cash on Delivery according to your store configuration.

---

## 3. Managing Pre-Orders in the Admin Panel

1. In the main admin sidebar, open **Preorder**.
2. Review the consolidated DataGrid of all pre-order line items, including:
   - Order ID and placement timestamp.
   - Item name, SKU, and reserved quantity.
   - Customer details and current order status.
   - Scheduled release/availability dates.

---

## 4. Notifying Customers When Stock Arrives

Once shipments arrive at your fulfillment facility:
1. Open the Pre-Order admin listing.
2. Select the orders holding the newly received item via the row checkboxes.
3. Click **Notify Customer** from the bulk actions bar.
4. Bagisto automatically dispatches notification emails alerting customers that their reserved merchandise is in stock and preparing for delivery.

