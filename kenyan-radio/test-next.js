// Simple test script to check if Next.js can be loaded
const next = require('next');

console.log('Next.js version:', require('next/package.json').version);
console.log('Node.js version:', process.version);
console.log('Environment:', process.env.NODE_ENV);

// Try to initialize a Next.js app
try {
  const app = next({ dev: true });
  console.log('Successfully initialized Next.js app');
} catch (error) {
  console.error('Error initializing Next.js app:', error);
}
