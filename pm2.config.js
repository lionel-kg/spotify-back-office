module.exports = {
  apps: [
    {
      name: 'back-office-spotify',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
