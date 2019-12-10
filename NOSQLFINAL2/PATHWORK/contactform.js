exports.postForm = function(email, firstname, age, callback) {
	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect("mongodb://localhost:27017/nosqlfinal", function (err, db) {
		if(err){
			callback("err", "ERROR SUBMIT FAILED");
		} else{
			var dbo = db.db("nosqlfinal");
			var data = {Email : email, FirstName : firstname, Age : age};

			dbo.collection("ContactSubmission").insertOne(data, function(err, res) {
				if(err) {
					callback("err", "ERROR SUBMIT FAILED");
					db.close();
				} else{
					callback("suc", "Success");
					db.close();
				}
			});

		}
	});
}
