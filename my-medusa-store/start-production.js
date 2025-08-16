#!/usr/bin/env node

const { spawn } = require('child_process');

// Set environment variable to skip admin panel
process.env.MEDUSA_ADMIN_ONBOARDING = 'false';
process.env.SERVE_ADMIN = 'false';

// Start the Medusa server
const medusa = spawn('npx', ['medusa', 'start'], {
  env: { ...process.env },
  stdio: 'inherit'
});

medusa.on('close', (code) => {
  process.exit(code);
});