module.exports = {
    port: process.env.PORT || 3000,
    mongoUri:  process.env.MONGO_URI || 'mongodb://localhost:27017/activity',
    urlLogo: process.env.LOGO_DEFAULT
}