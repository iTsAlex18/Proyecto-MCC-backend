module.exports = {

  'strapi-neon-tech-db-branches': {
    enabled: true,
    config: {
      neonApiKey: "napi_x2hli0uj0z9yr3t22jp2xglg4yi1cdyuq64lnslfaag2ozgk88b4kvlozo5f10g2", // get it from here: https://console.neon.tech/app/settings/api-keys
      neonProjectName: "proyecto-MCC-backend", // the neon project under wich your DB runs
      neonRole: "neondb_owner", // create it manually under roles for your project first
      gitBranch: "main", // branch can be pinned via this config option. Will not use branch from git then. Usefull for preview/production deployment
    }
  },
}

export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  
});
