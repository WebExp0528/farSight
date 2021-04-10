const path = require('path');

module.exports = {
  apps: [
    {
      name: 'farSight',
      script: 'node ./server.js',
      watch: true,
      ignore_watch: ['node_modules', 'build', 'config', 'src', 'public', '.vscode', '.husky'],
      watch_options: {
        usePolling: true
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development',
        PORT: '3000'
      }
    }
  ]
};
