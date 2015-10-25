"use strict";
module.exports = function(sequelize, DataTypes) {
  var Test = sequelize.define("test", {
    tid: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });
  return Test;
};