#!/bin/bash

PORT=8000
echo "Checking for processes on port $PORT..."

# Check if port is in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Port $PORT is in use. Attempting to free it..."
    
    # Get PID of process using the port
    PID=$(lsof -Pi :$PORT -sTCP:LISTEN -t)
    
    if [ ! -z "$PID" ]; then
        echo "Killing process $PID on port $PORT"
        kill -9 $PID
        sleep 1
    fi
fi

echo "Starting development server on port $PORT..."
npm run dev