module.exports = {
  apps : [{
    name: 'Library',
    script: 'server.js',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '118.25.45.11',
      ref  : 'origin/master',
      repo : 'https://github.com/rednimbus/server.git',
      path : '/root/nimbus/library',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
