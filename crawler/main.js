const db = require('./db');
const URLProvider = require('./url_provider');

const seq = db.init();

const URL = seq.models.url;
const Session = seq.models.sessions;

let prov = new URLProvider(seq);

prov.nextURL().then((nexturl)=>{
  console.log(nexturl.id);
  console.log(nexturl.path);
  console.log(nexturl.URLString());
})

