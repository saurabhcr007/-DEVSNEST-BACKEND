const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    "postgres",
    "postgres",
    "postgres",
    {
        host: "localhost",
        dialect: "postgres"
    }
)

sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log("connection established with database");
    } catch (err) {
        console.error("unable to connect to database");
    }
})();

module.exports = sequelize;