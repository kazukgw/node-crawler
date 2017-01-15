const config = require('./config');
const Sequelize = require('sequelize');

const URL = require('./models/url');
const Session = require('./models/session');

exports.init = function() {
  let conf = config.init()

  let seq = new Sequelize(
    conf.db.database,
    conf.db.user,
    conf.db.password,
    conf.db
  );

  URL.init(seq);
  Session.init(seq);

  return seq
};
