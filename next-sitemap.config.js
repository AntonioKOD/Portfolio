/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://codewithtoni.com',
  generateRobotsTxt: true,
  // Exclude any internal or non-public routes
  exclude: ['/admin/*', '/api/*', '/auth/*'],
  // The transform function lets you customize each entry
  transform: async (config, path) => {
    return {
      loc: path, // This becomes the full URL as `${siteUrl}/${path}`
      changefreq: 'weekly',
      priority: path === '' ? 1 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  // additionalPaths adds extra static routes to your sitemap
  additionalPaths: async (config) => {
    const staticRoutes = [
      '/',              // Home page
      '/blog/',         // Blog landing page
      '/contact/',      // Contact page
      '/login/',        // Login page
      '/projects/',     // Projects overview page
      '/services/',     // Services page
      '/signup/',       // Signup page
      '/skills/',       // Skills page
      '/verify-notice/',// Verification notice page
      '/verifyEmail/',  // Verify Email page
      '/web-templates/',// Web templates overview page
    ];
    
    // Map over routes and return transformed entries.
    return staticRoutes.map((route) => ({
      loc: route,
      changefreq: 'weekly',
      priority: route === '/' ? 1 : 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};