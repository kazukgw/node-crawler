const jschardet = require('jschardet');
const Iconv = require('iconv').Iconv;

exports.conv = function (str) {
  var detectResult = jschardet.detect(str);
  if (detectResult.encoding === 'UTF-8') {
    return str;
  }
  var icv = new Iconv(detectResult.encoding, 'UTF-8//TRANSLIT//IGNORE');
  return icv.convert(str).toString();
}
