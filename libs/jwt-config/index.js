const config = {
  jwtSecret: process.env.JWT_SECRET,
  // jwtExpiration: 60,
  // jwtRefreshExpiration: 120,
  jwtExpiration: (1 * 60 * 60),
  jwtRefreshExpiration: (24 * 60 * 60),
};

export default config;