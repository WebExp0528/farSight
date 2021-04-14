const path = require('path');

module.exports = {
  apps: [
    {
      name: 'farSight',
      script: 'server.js',
      watch: true,
      ignore_watch: ['node_modules', 'build', 'config', 'src', 'public', '.vscode', '.husky', 'sessions'],
      watch_options: {
        usePolling: true
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development',
        PORT: '8080'
      },
      env_prod: {
        NODE_ENV: 'production',
        PORT: '3000'
      }
    }
  ]
};
