const path = require('path');

module.exports = {
  apps: [
    {
      name: 'farSight',
      script: 'server/index.js',
      watch: ['build', 'server'],
      ignore_watch: ['.git', 'node_modules', 'build', 'config', 'src', 'public', '.vscode', '.husky', 'sessions'],
      watch_options: {
        usePolling: true
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development',
        PORT: '3030'
      },
      env_prod: {
        NODE_ENV: 'production',
        PORT: '3000'
      }
    }
  ]
};
