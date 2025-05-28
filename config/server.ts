module.exports = ({ env }) => ({
  url: env('PUBLIC_URL', 'https://proyecto-mcc-backend.onrender.com'), // 👈 esta línea es clave
  host: '0.0.0.0',
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});