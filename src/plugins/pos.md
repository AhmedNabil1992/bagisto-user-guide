# Point of Sale (POS)

Bagisto's integrated Point of Sale (POS) system connects your brick-and-mortar retail stores, pop-up shops, and physical outlets directly with your eCommerce platform on a unified database. Enjoy real-time inventory synchronization, thermal receipt printing, shift reconciliation, and comprehensive cashbox tracking.

---

## 1. Overview & Admin Menu Navigation

The **Point of Sale (POS)** module appears as a primary top-level menu item in the Bagisto Admin sidebar (positioned between Sales and Catalog), offering 5 dedicated operational sections:
1. **POS Terminal**: The high-speed cashier checkout interface.
2. **Outlets & Branches**: Manage retail locations and link each outlet to its specific inventory warehouse.
3. **Cashier Sessions & Shifts**: Open/close shifts with automatic discrepancy and surplus/shortage tracking.
4. **Cashboxes & Treasuries**: Track daily till cashboxes, master vaults, deposits, and petty cash expenses.
5. **Cash Transfers**: Safely remit collected cash from till registers to central company vaults with full audit logs.

---

## 2. Managing Outlets & Branches

Before cashiers start selling, set up your physical retail outlets and connect them to Bagisto's inventory system:

### Create a New Outlet:
1. Navigate to **Point of Sale (POS) >> Outlets**.
2. Click **Create Outlet**.
3. Fill in the required details:
   - **Name**: The branch or store name (e.g., Cairo Downtown, Alexandria Branch).
   - **Status**: Enable or disable the outlet.
   - **Inventory Source**: Select the Bagisto warehouse linked to this store. Sales at this outlet will exclusively deduct physical stock from this assigned inventory source.
   - **Address & Contact Info**: Physical store address and phone number (these details automatically print on customer thermal receipts).
4. Click **Save Outlet**.

---

## 3. Cashier Shifts & Sessions

Prevent cashier discrepancies and maintain complete accountability across all business hours:

### Opening a Shift (Open Session):
1. When a cashier accesses the POS Terminal, the system prompts them to start a new session.
2. The cashier counts the starting drawer float and inputs the **Opening Cash Balance**.
3. Select the assigned Outlet and Cashbox, then click **Open Session**.

### Live Session Monitoring:
During the shift, the system tracks and categorizes transactions in real time:
- **Cash Sales**: Total cash collected.
- **Card / POS Terminal Sales**: Electronic bank card transactions.
- **Split Payments**: Orders paid partially in cash and partially by card.
- **Orders Count**: Total number of completed transactions.

### Closing a Shift & Reconciliation (Close Session):
1. At the end of the shift, the cashier clicks **Close Session**.
2. Count the physical cash in the drawer and enter the **Closing Cash**.
3. The system automatically computes:
   - **Expected Cash** = Opening Balance + Cash Sales + Deposits - Withdrawals.
   - **Difference**:
     - Difference `0`: Perfectly balanced drawer.
     - Negative difference: Flagged automatically as a **Shortage** with the exact amount.
     - Positive difference: Flagged as a **Surplus**.
4. The shift is locked and timestamped with the cashier identity for accounting audits.

---

## 4. POS Terminal Checkout Interface

Designed for high-speed operation, touch screens, and desktop barcode scanners:

### Product Lookup & Scanning:
- **Barcode Scanner**: Point any USB or Bluetooth barcode scanner at the product tag to immediately add it to the cart and increment quantities without keyboard interaction.
- **Instant Search**: Search by name, SKU, or filter products by categories.
- **Configurable Variants**: For products with sizes and colors, a quick selection drawer pops up to pick the desired variant available in the outlet's warehouse.

### Cart Management & Line-Item Discounts:
- Adjust quantities with simple `+` and `-` controls.
- Apply percentage or fixed-amount discounts to line items or the entire cart (subject to user permissions).
- Clear the entire cart or remove items with a single tap.

### Customer Selection:
- **Default Cash Customer (Walk-in)**: Pre-selected for rapid over-the-counter transactions without data entry.
- **Search Existing Customers**: Look up registered shoppers by phone number, email, or name to accrue loyalty points.
- **Quick Registration**: Register a new customer on the fly without leaving the cashier screen.

### Checkout & Payment Methods:
1. **Cash**: Enter the tendered customer cash amount. The system instantly displays the exact **Change Due** to return to the customer.
2. **Card**: Record payments processed via bank card terminals, including optional transaction reference numbers.
3. **Split Payment**: Split the cart total between multiple payment methods (e.g. 50% Cash, 50% Card).

### Thermal Receipt Printing:
- Upon checkout completion, the receipt dialog automatically generates standardized receipts formatted for **80mm and 58mm thermal printers**.
- Receipts include the store logo, outlet address, invoice number, date/time, cashier name, itemized products, tax breakdown, and customizable return policy notices.

---

## 5. Cashboxes, Treasuries & Cash Transfers

Maintain full transparency over physical currency movements:

### Cashboxes:
- **Main Vault**: Central store or headquarters safe.
- **Till Cashbox**: Individual cash drawer assigned to each active register.

### Cash Transactions:
- **Cash In (Deposit)**: Record manual additions to the drawer (e.g. additional small-change float) with a designated reason.
- **Cash Out (Expense)**: Log petty cash withdrawals for local store expenses with notes and receipts.

### Cash Transfers:
- Transfer end-of-day cash collections from the cashier till to the master company vault.
- Every transfer logs the source cashbox, destination vault, amount, authorized user, and timestamp.

---

## 6. User Roles & ACL Permissions

Manage POS access through Bagisto's **Roles & Permissions** engine:
- **Cashier**: Restricted to operating the terminal, opening/closing their own shift, and printing receipts.
- **POS Supervisor**: Authorized to review cashier shifts, execute cash-in/cash-out drawer adjustments, and verify till handovers.
- **POS Administrator**: Full access to create outlets, link inventory sources, manage cashboxes, and view multi-branch financial reports.
