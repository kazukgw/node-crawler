const process = require('process');
const fs = require('fs');
const sequelize = require('sequelize');

const db = require('../db');

const seq = db.init();
const URL = seq.models.url;

let fname = process.argv[2];

fs.readFile(fname, (err, data)=>{
  if (err) throw err;
  console.log(data);
  var urls = data.toString().split("\n");
  var urlnum = 0;

  seq.transaction((t)=>{
    var urlobjs = urls.map((urlstr, i)=>{
      return URL.buildObjWithURLString(urlstr);
    }).filter((v)=>{
        return v.schema !== '' && !!v.schema;
    });

    urlnum = urlobjs.length;
    return URL.bulkCreate(urlobjs, {transaction: t});
  })
  .then(()=>{
    console.log('succeed to load ' + urlnum + ' urls');
  })
  .catch((err)=>{
    console.log(err);
  });
});

