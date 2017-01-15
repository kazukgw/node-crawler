const db = require('../db');

const seq = db.init();

seq.drop()
  .then(()=>{
    console.log("succeed to drop all tables");
  })
  .catch((err)=>{
    console.log(err);
  })

