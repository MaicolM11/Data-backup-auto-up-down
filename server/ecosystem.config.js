module.exports = {
    apps : [{
      name: 'Server',
      script: './index.js',
      // log: 'process.log', 
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT : 3000,
        URL_DB : 'mongodb+srv://maicol:1234@cluster0.c7ppq.mongodb.net/project1?retryWrites=true&w=majority'
       //        'mongodb://localhost/dbanme'
      }
    }]
  };