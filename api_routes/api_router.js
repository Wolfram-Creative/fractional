var users = require('./users');

function api (req, res) {
	var api_route = req.params.route;
	return {
		tasks: function (method, params) {
			switch (method) {
				case 'get':
					res.send(501, {
						succes: false,
						message: '"' + api_route + '" API does not exist with a "' + method + '" method',
						body: {}
					});
					break;
				case 'put':
					res.send(501, {
						succes: false,
						message: '"' + api_route + '" API does not exist with a "' + method + '" method',
						body: {}
					});
					break;
				case 'delete':
					res.send(501, {
						succes: false,
						message: '"' + api_route + '" API does not exist with a "' + method + '" method',
						body: {}
					});
					break;
				case 'post':
					res.send(501, {
						succes: false,
						message: '"' + api_route + '" API does not exist with a "' + method + '" method',
						body: {}
					});
					break;
			}
		},
		users: function (method, params) {
			switch (method) {
				case 'get':
					res.send(501, {
						succes: false,
						message: '"' + api_route + '" API does not exist with a "' + method + '" method',
						body: {}
					});
					break;
				case 'put':
					res.send(501, {
						succes: false,
						message: '"' + api_route + '" API does not exist with a "' + method + '" method',
						body: {}
					});
					break;
				case 'delete':
					res.send(501, {
						succes: false,
						message: '"' + api_route + '" API does not exist with a "' + method + '" method',
						body: {}
					});
					break;
				case 'post':
					res.send(501, {
						succes: false,
						message: '"' + api_route + '" API does not exist with a "' + method + '" method',
						body: {}
					});
					break;
			}
		}
	}
}


exports.route = function (req, res) {
	var route = req.route,
		params = route.params,
		method = route.method,
		api_route = params.route;
	switch (api_route) {
		case 'tasks':
			api(req, res).tasks(method, params);
			break;
		case 'users':
			api(req, res).users(method, params);
			break;
		default:
			res.send(404, {
				succes: false,
				message: '"' +api_route + '" API does not exist',
				body: {}
			});
	}
}

