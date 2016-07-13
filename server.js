var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mysql = require("mysql");
var http = require('http').Server(app);

app.use(express.static('data'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

/* Creating MySQL connection.*/
var con = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'mycorp'
});

app.get('/',function(req,res){
    res.sendFile('index.html', {'root':__dirname + '/public'});
});

app.post('/get_data', function (req, res) {
	var key = req.body.name;
	con.getConnection(function(err, connection){
	if (err) {
		console.log("failed to connect");
		connection.release();
	} else {
		var query="select * from employees where name like '%"+key+"%'";
		con.query(String(query), function(err, rows) { 
			connection.release();
			if (!err) {
				if (rows.length > 0) {
				  res.write(JSON.stringify(rows));
				  res.end();
				} else {
				  rows = [];
				  res.write(JSON.stringify(rows));
				  res.end();
				} 
			} else {
				console.log("query failed");  
			}        
		});
	}
	});  
});

http.listen(8080, function(){
    console.log("Server is running on port 8080");
});