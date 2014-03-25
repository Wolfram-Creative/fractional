app.filter('obj_key', function(){
	return function(input, query){
		if(!query) return input;
			var result = {};
			var lower_query = query.toLowerCase();
			for (var key in input) {
				lower_key = key.toLowerCase();
				if(lower_key.indexOf(lower_query) > -1) {
					result[key] = input[key];
			}
		}
		return result;
	};
});
