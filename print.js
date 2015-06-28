var fs = require('fs');

var printer = require('printer');
var pdfium = require('pdfium');

fs.readFile('test.pdf', function(err, data) {
	if (err) throw err;

	pdfium.render({
		data: data,
		outputFormat: 'PNG',
		scaleFactor: 3.0
	}, function(err, pages) {
		if (err) throw err;

		pages.forEach(function(page) {

			fs.writeFile('out.png', page);

			return;
			printer.printDirect({
				data: page,
				type: 'AUTO',
				success: function() {
					console.log('printed a page');
				},
				error: function(err) {
					console.log('error printing: ' + err);
				}
			});
		});
	});
});
