/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://codewithtoni.com',
    generateRobotsTxt: true, // (optional) Generate a robots.txt file
    // Additional options can go here
  };