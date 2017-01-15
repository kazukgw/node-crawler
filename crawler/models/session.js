const Sequelize = require('sequelize');

const MODEL_NAME = 'Session'

const TABLE_NAME = 'sessions'

exports.name = MODEL_NAME

exports.init = function(seq) {
  return seq.define(TABLE_NAME, {
    id: {
      field: 'id',
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    urlId: {
      field: 'url_id',
      type: Sequelize.BIGINT,
      allowNull: false
    },
    startAt: {
      field: 'start_at',
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    endAt: {
      field: 'end_at',
      type: Sequelize.DATE,
      allowNull: true
    },
    state: {
      field: 'state',
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 100
    },
    responseCode: {
      field: 'response_code',
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    result: {
      field: 'result',
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  },{
    timestamps: false,
    freezeTableName: true,
    indexes: [
      { fields: ['url_id'] },
      { unique: true, fields: ['state'] }
    ],
    classMethods: {
      NewSession: function(urlobj) {
        return this.create({ url_id: urlobj.id })
          .then((sess)=>{
            return new Promise((res, rej)=>{
              sess.urlobj = urlobj;
              return res(sess);
            });
          });
      }
    },
    instanceMethods: {
    }
  });
};
