var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mysqlnode2'
    },
    port: 3000,
    db: {
      protocol : "mysql",
      query    : { pool: true },
      host     : "localhost",
      port     : "3306",
      database : "dbsysdoctor",
      user     : "root",
      password : "administrator"
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'mysqlnode2'
    },
    port: 3000,
    db: {
      protocol : "mysql",
      query    : { pool: true },
      host     : "localhost",
      port     : "3306",
      database : "dbsysdoctor",
      user     : "root",
      password : "administrator"
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'mysqlnode2'
    },
    port: 3000,
    db: {
      protocol : "mysql",
      query    : { pool: true },
      host     : "localhost",
      port     : "3306",
      database : "dbsysdoctor",
      user     : "root",
      password : "administrator"
    }
  }
};

module.exports = config[env];
