# Book Seeding Guide for Medusa Bookstore

## What Was Done

I've successfully populated your Medusa database with sample book data including:

### Categories Created:
- **Fiction** (The Great Gatsby, 1984)
- **Non-Fiction** (Sapiens, Educated)  
- **Science & Technology** (Thinking, Fast and Slow)
- **Literature & Poetry** (The Alchemist)
- **Business & Economics** (The Lean Startup)
- **Art & Design** (Ways of Seeing)

### Products Added:
Each book includes multiple format options (Hardcover, Paperback, E-book, some with Audiobook) with realistic pricing in GBP and USD.

## How to Access Your Dashboard

1. **Start the backend server:**
   ```bash
   cd my-medusa-store
   npm run dev
   ```

2. **Open the admin dashboard:**
   - Navigate to: http://localhost:9000/app
   - Create an admin user if you haven't already:
     ```bash
     npx medusa user --email admin@example.com --password supersecret
     ```

3. **View your data:**
   - Products → See all 8 book products
   - Categories → See the 6 book categories
   - Inventory → Check stock levels (set to 1,000,000 per variant)

## How to Run Seeding Yourself

### Option 1: Book-only seeding (Recommended)
```bash
npm run seed:books
```
This script:
- Checks for existing data before creating
- Only adds book categories and products
- Won't conflict with existing Medusa data

### Option 2: Full seeding (includes infrastructure)
```bash
npm run seed
```
This runs the complete seed with regions, shipping, etc.

## Understanding the Data Structure

### Product Variants
Each book has multiple variants for different formats:
- **Hardcover**: Higher price, premium option
- **Paperback**: Standard pricing
- **E-book**: Lower price, digital format
- **Audiobook**: Available for some titles

### Pricing Structure
Prices are stored in **cents** (e.g., 2000 = £20.00, 2500 = $25.00)

### Categories
Books are properly categorized to help customers browse by genre/type.

## Testing Your Store

### In the Admin Dashboard:
1. **Products**: View, edit, add new books
2. **Categories**: Organize your catalog
3. **Inventory**: Manage stock levels
4. **Orders**: Process customer purchases
5. **Customers**: View customer data

### In the Storefront:
1. Start your storefront:
   ```bash
   cd my-medusa-store-storefront
   npm run dev
   ```
2. Browse products by category
3. Add items to cart
4. Test checkout process

## Adding More Books

To add more books, you can either:

1. **Use the Admin UI**: 
   - Go to Products → Add Product
   - Fill in details, set category, add variants

2. **Extend the seed script**:
   - Edit `src/scripts/seed-books.ts`
   - Add new book objects to the products array
   - Run `npm run seed:books` again

## Common Commands

```bash
# Start development server
npm run dev

# Seed books only
npm run seed:books

# Full seeding
npm run seed

# Create admin user
npx medusa user --email your@email.com --password yourpassword

# Run migrations
npx medusa db:migrate
```

## Next Steps

Your bookstore now has sample data to work with! You can:
- Customize product information in the admin
- Add more books using the patterns established
- Configure payment providers
- Set up your storefront design
- Test the complete purchase flow

The admin dashboard is your primary tool for managing products, orders, and customers.