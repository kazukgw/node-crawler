const cron = require('node-cron');
const rp = require('request-promise');
const cheerio = require('cheerio');

const converter = require('./converter');

class Bot {
  constructor(conf) {
    this.seq = conf.seq;
    this.Session = seq.models.sessions;
    this.URL = seq.models.url;

    this.schedule = conf.schedule;

    this.resHandler = conf.resHandler;

    this.errHandler = conf.errHandler;

    this.finalyFunc = conf.finalyFunc;

    this.urlProvider = conf.urlProvider;

    this.task = cron.schedule(this.schedule, this.runSession.bind(this));

    this.sessions = [];
  }

  start() {
    this.task.start();
  }

  stop() {
    this.task.stop();
  }

  runSession() {
    var self = this;
    this.urlProvider.nextURL()
      .then((urlobj)=>{
        return self.Session.NewSession(urlobj);
      })
      .then((sess)=>{
        sess.fetchConf = {
          uri: sess.urlobj.URLString(),
          proxy: self.nextProxy(),
          headers: {
            'User-Agent': self.nextUserAgent()
          },
          transform: (body)=>{
            return cheerio.load(converter.conv(body))
          }
        };

        return new Promise((res, rej)=>{
          rp(sess.fetchConf)
            .then(($)=>{ res(sess, $) })
            .catch((err)=>{ rej(err) });
        });
      })
      .then(this.resHandler.bind(this))
      .catch(this.errHandler.bind(this));
  }
}

module.exports = Bot;
