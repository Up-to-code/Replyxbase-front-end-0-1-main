# Environment Variables Setup

Add the following environment variables to your `.env.local` file:

## Required Variables

```bash
# Database Connection (should already exist)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Better Auth Secret (generate a random string)
BETTER_AUTH_SECRET="your-secret-key-min-32-chars"

# Better Auth Base URL
BETTER_AUTH_URL="http://localhost:3000"
# For production: https://yourdomain.com
```

## Optional - OAuth Providers

### Google OAuth (Optional)
```bash
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### GitHub OAuth (Optional)
```bash
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

## Generating BETTER_AUTH_SECRET

You can generate a secure random secret using one of these methods:

**Using OpenSSL:**
```bash
openssl rand -base64 32
```

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Using Bun:**
```bash
bun -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Next Steps

1. **Set up your database**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **Generate schema**: The Prisma schema has been generated with all Better Auth tables
3. **Run migration**: Execute `bunx prisma migrate dev --name add_better_auth` when database is ready
4. **Generate Prisma client**: Run `bunx prisma generate` after migration
5. **Restart dev server**: The `bun dev` server will pick up the changes
