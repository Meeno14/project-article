module.exports = (sequelize, Sequelize) => {
  const Site = sequelize.define("site", {
    title: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.TEXT,
    },
    path: {
      type: Sequelize.TEXT,
    },
  });
  return Site;
};
