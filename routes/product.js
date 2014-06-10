/*
 * GET home page.
 */

exports.product = function(req, res) {
	// console.log(req.q, req.params, req.body);
	res.render('product', {
		id: 'req.q.id'
	});
};