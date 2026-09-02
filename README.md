# Kyronex Electrical & Interiors — Product Catalogue

A simple product catalogue website for Kyronex Electrical & Interiors, built
with Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL and Prisma.

The site is intentionally simple: customers browse and search products and
enquire about them; there is **no** payment, checkout, ordering, delivery,
accounting or customer-account functionality. An admin panel lets you add,
edit and delete products, including uploading real photos.

## Features

- Public pages: Home, Products, Product detail, Category pages, About, Contact
- Search by product name, category or SKU, plus category filtering
- Admin panel at `/admin`: login, product list, add/edit/delete products
- Real image uploads — images you upload in the admin panel are saved to
  `/public/uploads` and immediately shown on the product cards and product page
- All 40+ products from the Kyronex catalogue spreadsheet are pre-seeded
  across the 5 categories (Solar & Energy, Electrical, 3-Phase & Industrial,
  Lighting, Water & Power), each with placeholder photos you can replace at
  any time from the admin panel
- Flexible name/value specifications per product, editable in the admin form

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your own values:

```bash
cp .env.example .env
```

- `DATABASE_URL` — your PostgreSQL connection string
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — the login credentials for `/admin`
- `SESSION_SECRET` — any long random string, used to sign the admin session cookie

### 3. Set up the database

```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

This creates the `Product` table and seeds it with all products from the
Kyronex catalogue spreadsheet (with placeholder images).

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin` to log in to the admin panel (using the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in `.env`).

### 5. Replace placeholder images

Every seeded product starts with a placeholder photo. From
`/admin/products`, click **Edit** on any product, then use the image
uploader to upload real photos — the first photo becomes the main image
shown on the product card, and you can reorder or delete images at any time.

## Project Structure

```
prisma/schema.prisma       Product data model
prisma/seed.ts             Seed script with all catalogue products
src/app/                   Public + admin pages (Next.js App Router)
src/app/api/                Products, image upload and auth API routes
src/components/            Reusable UI components
src/lib/                   Prisma client, auth helpers, category list
public/uploads/            Uploaded product images are stored here
```

## Notes

- Categories are fixed to the five ranges defined for Kyronex (Solar &
  Energy, Electrical, 3-Phase & Industrial, Lighting, Water & Power) to keep
  the project simple, per the brief.
- The design uses the "Kyronex Industrial Core" tokens: navy/green/gray
  palette, Inter typeface, and a consistent 4px border radius across all
  cards, buttons and inputs.
- Deploy anywhere that supports Next.js + PostgreSQL (e.g. Vercel + a managed
  Postgres provider such as Neon or Supabase). Remember to set the same
  environment variables in your hosting provider, and note that on most
  serverless hosts the local `public/uploads` folder is not persistent —
  for production use, swap the upload route for an object storage service
  (e.g. S3, Cloudinary) if you deploy serverless.
