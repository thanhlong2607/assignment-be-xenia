module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME || 'localhost',
    password: process.env.POSTGRES_PASSWORD || '123123',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || '5432',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
