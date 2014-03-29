var page = require('webpage').create(),
	system = require('system'),
	t,
	address;
address = system.args[1];
page.open(address, function (status) {
	// console.log(status);
  if (status !== 'success') {
    console.log('Failed to load the address')
  } else {
 	console.log(page.content);
  }
  phantom.exit()
})