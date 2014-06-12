
/*
 * GET users listing.
 */

var mongodb = require('./db');

function Post(post){
	this.title = post.title;
	this.content = post.content;
}

module.exports = Post;

// 存储用户信息
Post.prototype.save = function (callback) {
	var user = {
		title: this.title,
		content: this.content
	}
	mongodb.open(function (err, db) {
		if(err){
			return callback(err)
		}
		db.collection('posts', function (err, collection) {
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(user, {
				safe: true
			}, function (err, user) {
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null, user[0]);
			})
		})
	})
}

Post.get = function (id, callback) {
	mongodb.open(function (err, db) {
		if(err){
			return callback(err)
		}
		db.collection('posts', function (err, collection) { 
			collection.find(function(a, posts){
				console.log(posts.toArray())
			})
			// if(err){
			// 	mongodb.close();
			// 	return callback(err);
			// }
			// collection.find(id ? {id : id} : {}, function (err, posts) {
			// 	mongodb.close();
			// 	if(err){
			// 		return callback(err)
			// 	}
			// 	callback(null, posts);
			// })
		})


	})
}