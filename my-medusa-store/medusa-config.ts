import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Build the modules array conditionally
const modules: any[] = [
  {
    resolve: "@medusajs/auth",
    options: {
      providers: [
        {
          resolve: "@medusajs/auth-emailpass",
          id: "emailpass",
          options: {}
        }
      ]
    }
  }
]

// Only add Stripe if API key is present (webhook secret is optional for build)
if (process.env.STRIPE_API_KEY && process.env.STRIPE_API_KEY !== 'your_stripe_secret_key') {
  modules.push({
    resolve: "@medusajs/payment-stripe",
    options: {
      apiKey: process.env.STRIPE_API_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
    }
  })
}

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL || "postgres://localhost/medusa",
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000,http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:5173,http://localhost:9000",
      authCors: process.env.AUTH_CORS || "http://localhost:3000,http://localhost:5173,http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules
})