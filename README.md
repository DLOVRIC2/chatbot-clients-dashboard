steps to run the app

## Setup

1. Install dependencies:

   ```bash
   pnpm i
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file:
   - Set your database URL in `DATABASE_URL` and `DIRECT_URL`
   - Configure `ADMIN_PASSWORD`
   - Adjust other variables as need
4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```
5. Push prisma 

   ```bash
   npx prisma db push
   ```
6. Start the development server:
   ```bash
   pnpm dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000)
