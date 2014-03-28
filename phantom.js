// phantomjs test script
// opens url and reports time to load
// requires an active internet connection
var page = require('webpage').create(),
	system = require('system'),
	t,
	address;

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>')
  phantom.exit()
}

t = Date.now()
address = system.args[1]
console.log(address);
page.open(address, function (status) {
	console.log(status);
  if (status !== 'success') {
    console.log('Failed to load the address')
  } else {
    t = Date.now() - t
    console.log('Loading time ' + t + ' msec')
  }
  // page.render('screenshot.png');
 	var doc = page.evaluate(function () {
 		return document;
 	});
 	console.log(doc);
  phantom.exit()
})