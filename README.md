## 📋 <a name="table">Table of Contents</a>

1. 👋 [Welcome](#welcome)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. ❌ [Don't Have](#donts)
5. 🌐 [Web Deployment](#web)
6. 🤸 [Setup](#quick-start)

## <a name="welcome"> 👋 Welcome </a>

Thanks for checking out this lead tracker mini app.

## <a name="tech-stack">⚙️ Tech Stack </a>

- [Next.js](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [Supabase](https://supabase.com/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Shadcn](https://ui.shadcn.com/docs/installation)

## <a name="features">🔋 Features</a>

👉 Lead creation with validation

👉 Simple UI/UX with event notifications

👉 Follows the provided database schema

👉 Lead tabular view withSSR with real pagination (page size 10)

👉 Lead tabular edit

👉 End-to-end validation and user sanitization

👉 CSV file import

**Design Notes**

- Validation is done on Client with Zod mainly on the forms
- type validation and checking are done with typescript
- Error handling done from api notifies the user for better UX
- Pagination is implemented SSR and not on client for better performance

## <a name="donts">❌ Skipped</a>

⚠️ Lead debounced search searching and filtering

⚠️ Full authentication and authorization

⚠️ Simple rate limit on create/update (per user/IP)

⚠️ CSV file export

**Reason**

- Not enough time to finish 😢

## <a name="web">🌐 WebSite Deployment </a>

- 🔗 [Lead](https://lead-flame.vercel.app/)

## <a name="quick-start"> 🤸 Quick Start </a>

Follow this steps to setup the project locally on your machine.

**Prerequsites**

Make sure you have the following installed on your machine

- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/en/download)
- [Next.js](https://nextjs.org/docs)

**Cloning the Repository**

```bash
git clone https://github.com/Miki0035/lead

cd lead
```

**Installing dependencies**

Check if everything is setup to run a flutter application:

```bash
npm install
```

**Environment variables**

In the root of your project

    - create '.env.local' file and inside and the following variables

    - DATABASE_URL= your_supbase_url / any_database_connection_string

    - NEXT_PUBLIC_APP_URL=http://localhost:3000

**Database Migration**

In the root of your project

    - create '.drizzle.config.ts' file and add drizzle configuration

then run

```bash
npx drizzle-kit generate

npx drizzle-kit push
```

**Running the Project**

Finally run

```bash
npm run dev
```

In your browser go to 'localhost:3000' 👍
