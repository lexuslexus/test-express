
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
User = require('../models/user.js'),
Post = require('../models/post.js')


module.exports = function (app) {
	app.get('/', function (req, res) {
		var postList;

		Post.get(null, function(err, posts){
			if(posts){
				postList = posts;
			}
		})

		res.render('index', {
			title : 'index',
			user : req.session.user,
			success : req.flash('success'),
			error : req.flash('error'),
			postList : postList
		});
		
	})
	app.get('/reg', function(req, res){
		if(req.session.user){
			req.flash('error', '已登录无法进入注册页！')
			res.redirect('/');
		}
	})
	app.get('/reg', function (req, res) {
		res.render('reg', {
			title : 'registry',
			user : req.session.user
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
			user : req.session.user,
			error : req.flash('error')
		});
	})
	app.post('/login', function (req, res) {
		var name = req.body.name,
		password = req.body.password;

		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');

		User.get(name, function (err, user) {
			if(user){
				if(!(password == user.password)){
					req.flash('error', '登录失败');
					res.redirect('/login');
				} else {
					req.session.user = user;
					res.redirect('/');
				}
				
			}
		})
	})
	app.get('/post', function (req, res) {
		res.render('post', {
			title : 'post',
			user : req.session.user,
			error : req.flash('error')
		});
	})
	app.post('/post', function (req, res) {
		var title = req.body.title,
		content = req.body.content,
		post;

		post = new Post({
			title : title,
			content : content
		})

		post.save(function (err, post) {
			if(err){
				req.flash('error', err);
				return res.redirect('/post');
			}
			req.flash('success', '发布成功');
			res.redirect('/');
		})

	})
	app.get('/logout', function (req, res) {
		req.session.user = null;
		res.redirect('/');
	})
}