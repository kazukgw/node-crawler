let Sequelize = require('sequelize');
let config = require('./config');

let conf = config.init();

class URLProvider {
  constructor(seq) {
    this.seq = seq;
    this.URL = seq.models.url;
    this.Session = seq.models.sessions;
  }

  nextURL() {
    return this.seq.query(
      'select url.* ' +
      'from url left outer join sessions on url.id = sessions.url_id ' +
      'group by url.id order by count(sessions.id) limit 1'
    ,{ model: this.URL }).then((v)=>{
      return new Promise((res, rej)=>{
        res(v[0]);
      });
    });
  }
};

module.exports = URLProvider;

