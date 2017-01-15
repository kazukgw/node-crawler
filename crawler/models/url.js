const url = require('url');
const Sequelize = require('sequelize');

const MODEL_NAME = 'URL'

const TABLE_NAME = 'url'

exports.name = MODEL_NAME

exports.init = function(seq) {
  return seq.define(TABLE_NAME, {
    id: {
      field: 'id',
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    schema: {
      field: 'schema',
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    host: {
      field: 'host',
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    path: {
      field: 'path',
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    query: {
      field: 'query',
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    fragment: {
      field: 'fragment',
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    urlType: {
      field: 'url_type',
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  },{
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    freezeTableName: true,
    indexes: [
      { unique: true, fields: ['path', 'query'] },
      { fields: ['path'] },
      { fields: ['query'] },
      { fields: ['fragment'] },
      { fields: ['url_type'] }
    ],
    classMethods: {
      buildWithURLString: function(urlstr){
        urlobj = url.parse(urlstr, true, false);
        return this.build({
          schema: urlobj.protocol,
          host: urlobj.host,
          path: urlobj.pathname,
          query: urlobj.search || '',
          fragment: urlobj.hash || ''
        });
      },
      buildObjWithURLString: function(urlstr){
        urlobj = url.parse(urlstr, true, false);
        return {
          schema: urlobj.protocol,
          host: urlobj.host,
          path: urlobj.pathname,
          query: urlobj.search || '',
          fragment: urlobj.hash || ''
        };
      }
    },
    instanceMethods: {
      URLString: function() {
        return url.format({
          protocol: this.schema,
          host: this.host,
          pathname: this.path,
          search: this.query,
          hash: this.fragment
        });
      }
    }
  });
};
