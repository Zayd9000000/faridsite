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