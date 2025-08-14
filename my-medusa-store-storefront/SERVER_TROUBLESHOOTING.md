# Server Startup Troubleshooting Guide

## Common Issue: Port Already in Use (EADDRINUSE)

The most common reason for server startup failure is port 8000 being already in use.

### Quick Fix Commands

```bash
# 1. Check what's using port 8000
lsof -i :8000

# 2. Kill the process using port 8000
kill -9 $(lsof -t -i:8000)

# 3. Start the server again
npm run dev
```

### Alternative Solutions

#### Option 1: Use a Different Port
```bash
# Run on port 3000 instead
next dev --turbopack -p 3000

# Or modify package.json temporarily
# Change: "dev": "next dev --turbopack -p 8000"
# To: "dev": "next dev --turbopack -p 3000"
```

#### Option 2: Kill All Node Processes
```bash
# Nuclear option - kills ALL node processes
killall node

# Then restart
npm run dev
```

#### Option 3: Use the Safe Dev Script
```bash
# This project has a safe dev script that handles port conflicts
npm run dev:safe
```

## Other Common Issues

### 1. Lockfile Conflicts
If you see warnings about multiple lockfiles:
```bash
# Remove conflicting lockfile
rm /Users/zayeed/Desktop/farid site/my-medusa-store-storefront/package-lock.json

# Reinstall dependencies with yarn (this project uses yarn)
yarn install
```

### 2. Missing Dependencies
```bash
# Clear node_modules and reinstall
rm -rf node_modules
yarn install
```

### 3. Environment Variables Missing
```bash
# Check if .env.local exists
ls -la | grep .env

# If missing, create from example
cp .env.example .env.local
```

### 4. Next.js Cache Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Automated Recovery Script

Create this as `start-server.sh`:

```bash
#!/bin/bash

echo "🔍 Checking for processes on port 8000..."
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8000 is in use. Killing process..."
    kill -9 $(lsof -t -i:8000)
    sleep 2
fi

echo "🧹 Clearing Next.js cache..."
rm -rf .next

echo "🚀 Starting development server..."
npm run dev
```

Make it executable:
```bash
chmod +x start-server.sh
./start-server.sh
```

## Quick Diagnosis Checklist

1. **Port conflict?** → `lsof -i :8000`
2. **Node modules installed?** → `ls node_modules`
3. **Environment configured?** → `ls .env.local`
4. **Lockfile issues?** → Check yarn.lock vs package-lock.json
5. **Cache corrupted?** → Remove .next folder

## Emergency Reset

If nothing else works:
```bash
# Full reset
kill -9 $(lsof -t -i:8000) 2>/dev/null
rm -rf node_modules .next
yarn install
npm run dev
```