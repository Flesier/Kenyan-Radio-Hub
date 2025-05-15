// Test script to start a Next.js server
const next = require('next');
const { createServer } = require('http');

console.log('Next.js version:', require('next/package.json').version);
console.log('Node.js version:', process.version);

// Initialize the Next.js app
const app = next({ dev: true, dir: __dirname });

// Prepare the app
app.prepare()
  .then(() => {
    // Create a simple HTTP server
    const server = createServer((req, res) => {
      // Let Next.js handle the request
      const handle = app.getRequestHandler();
      handle(req, res);
    });

    // Start the server on port 3002
    server.listen(3002, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3002');
    });
  })
  .catch((ex) => {
    console.error('Error starting server:', ex);
    process.exit(1);
  });
