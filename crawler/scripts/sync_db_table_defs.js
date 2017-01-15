const db = require('../db');

const seq = db.init();

seq.sync()
  .then(()=>{
    console.log("succeed to sync table defintion");
  })
  .catch((err)=>{
    console.log(err);
  })

