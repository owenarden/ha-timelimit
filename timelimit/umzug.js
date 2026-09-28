const path = require('node:path');
const { Umzug, SequelizeStorage } = require('umzug');

exports.createUmzug = sequelize => new Umzug({
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize,
  migrations: {
    glob: path.join(__dirname, 'migrations', '*.js'),
    resolve: ({ name, path: migrationPath }) => {
      const migration = require(migrationPath);
      const queryInterface = sequelize.getQueryInterface();
      return {
        name,
        up: () => migration.up(queryInterface, sequelize),
        down: () => migration.down(queryInterface, sequelize),
      };
    },
  },
  logger: console,
});
