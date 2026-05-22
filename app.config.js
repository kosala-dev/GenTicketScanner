import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    API_URL:
      process.env.API_URL ??
      'https://bba6-103-247-48-187.ngrok-free.app',
  },
});
