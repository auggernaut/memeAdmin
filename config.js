var fs = require('fs');


var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
for (var i in config) {
    config[i] = process.env[i.toUpperCase()] || config[i];
}
console.log('Configuration');
console.log(config);

module.exports = config;


