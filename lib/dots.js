// https://jsperf.com/js-templaters-benchmark/2
const dot = require('dot');

dot.templateSettings.strip = false;

module.exports = dot.process({ path: './tpl' });
