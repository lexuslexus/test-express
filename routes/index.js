
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   		res.render('index', {
// 			title : 'Express',
// 			logo : '<img src="http://www.baidu.com/img/baidu_jgylogo3.gif">'
// 		});
// };

var crypto = require('crypto'),
User = require('../models/user.js')


module.exports = function (app) {
	app.get('/', function (req, res) {
	// console.log(req.query, req.params, req.body);
		res.render('index', {
			title : 'index',
		});
	})
	app.get('/reg', function (req, res) {
		res.render('reg', {
			title : 'registry',
		});
	})
	app.post('/reg', function (req, res) {
		var name = req.body.name,
		password = req.body.password;

		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name: req.body.name,
			password: password,
			email: req.body.email
		});
		User.get(newUser.name, function (err, user) {
			if(user){
				req.flash('error', '用户已存在！');
				return res.redirect('/reg');
			}
			newUser.save(function (err, user) {
				if(err){
					req.flash('error', err);
					return res.redirect('/reg');
				}
				req.session.user = user;
				req.flash('success', '注册成功');
				res.redirect('/');
			})
		})
	})
	app.get('/login', function (req, res) {
		res.render('login', {
			title : 'login',
		});
	})
	app.post('/login', function (req, res) {

	})
	app.get('/post', function (req, res) {
		res.render('post', {
			title : 'post',
		});
	})
	app.post('/post', function (req, res) {

	})
	app.get('/logout', function (req, res) {
		
	})
}