#!/bin/bash

# Use Node.js v18.18.0
export PATH="/home/akinyi/.nvm/versions/node/v18.18.0/bin:$PATH"

# Check Node.js version
echo "Using Node.js version:"
node -v

# Run the development server on port 3001 with basic configuration
NODE_ENV=development NODE_OPTIONS="--max-old-space-size=4096" npm run dev -- -p 3001
