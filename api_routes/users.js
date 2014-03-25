exports.create = function (req, res) {
	var user_obj = req.body;
	model.user(user_obj, function(err, user) {
		if (!err) {
			username = user.username;
			db.users.find({username: username}, function (error, response) {
				if (!error) {
					if (!response.length) {
						db.users.insert(user, function (error, response) {
							if (error) {
								res.json({
									error: "Could Not Create User" 
								});
							} else {
								res.json({
									success: true,
									body: response
								});
							}
						});
					} else {
						res.json({
							success: false,
							body: response
						});
					}
				} else {
					res.json({
						success: false,
						error: "Database could not connect." 
					});
				}
			});
		} else {
			res.json({
				success: false,
				error: err
			});
		}
	});
};

exports.getUser = function (req, res) {
	var user_id = req.params.user_id;
	db.users.find({_id:db.ObjectId(user_id)}, function (error, response) {
		if (error) {
			res.send(400, {
				error: "User Not Found" 
			});
		} else {
			res.send(response);
		}
	});
};

exports.getUsers = function (req, res) {

	db.users.find({}).limit(20, function (error, response) {
		if (error) {
			res.send(400, {
				error: "User Not Found" 
			});
		} else {
			res.send(response);
		}
	});
};


exports.login = function (req, res) {
	var user_obj = req.body;
	username = user_obj.username;
	console.log(username);
	db.users.find({username: username}, function (error, response) {
		if (!error) {
			if (response.length) {
				response = response[0];
				res.json({
					success: true,
					body: response
				});
			} else {
				res.json({
					error: "Could Not find User" 
				});
			}
		} else {
			res.json({
				error: "Could Not find User" 
			});
		}
	});
};