var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./src/app/config/strings.json', 'utf8'));

exports.Strings = config