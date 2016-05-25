var Client = require('node-rest-client').Client;
var http = require('http') ;
var restMainUrl = "http://cmpe281-lab-1979921722.us-east-1.elb.amazonaws.com/userdb/exam";

exports.add = function(req, res) {
	var body = {
			data: {"username" : req.body.username,
			       "password" : req.body.password},
			       //location : req.body.location,
			headers: { "Content-Type": "application/json" }
	};
	
        var client = new Client();
        client.post(restMainUrl, body, function(data, response){
            	if(response) {
                     //console.log(body);
	             console.log("ADD STATUS: ");
                     console.log(data);
                     console.log(req.connection.remoteAddress);
            	} else {
      		     console.log("ERROR: add");
    				  
            	}
        });

};

exports.getall = function(req, res) {
	var json_responses;
	var client = new Client();
	  
	client.get(restMainUrl, function(data, response_raw){
	        if(response_raw) {
	         	console.log("GET DATA: ");
	            	console.log(data);                  
	                res.render('all', { values : data });
                        console.log(req.connection.remoteAddress);
	        } else {
	    		console.log("ERROR: get all");
	  
	        }
	});
	
	
};

exports.getone = function(req, res) {
	
	var json_responses;
	var response = [];
	console.log("here in one")
	var username = req.param("username");
	
	var restGetUrl = restMainUrl+"?query={\"username\":\""+username+"\"}";
	console.log(restGetUrl)
		 var client = new Client();
		  
		 client.get(restGetUrl, function(data, response){
		 	if(response) {
	         		console.log("GET DATA: ");
		        	console.log(data);
		        	res.render('all', { values : data });
		 	} else {
		   		console.log("ERROR: get one");
		  
		 	}
		 });

};


exports.update = function(req, res) {

	var json_responses;
	var response = [];
	console.log("here in update")
	
	var username = req.param("username");
	
	var body = {
			data: {"username" : req.body.username,
			"password" : req.body.password},
			//location : req.body.location,
			headers: { "Content-Type": "application/json" }
	};
	
	var restUpdUrl;
	var updId;
	
	var restGetUrl = restMainUrl+"?query={\"username\":\""+username+"\"}";
	var client = new Client();
		  
	client.get(restGetUrl, function(data, response){
	            	if(response) {
	            		console.log("UPDATE(1): ");
		          	console.log(data);
		            	updId = data[0]["_id"]
		            	console.log("id")
		            	console.log(updId)
		            					            			
		            	restUpdUrl = restMainUrl+"/"+updId;
		            	console.log(restUpdUrl)
		            			
		            	client.put(restUpdUrl, body, function(data, response){
		                       	if(response) {
	            			        console.log("UPDATE(2): ");
		                                console.log(data);
		                              
		                       	} else {
		               			console.log("ERROR: update(2)");
		                				 
		                       	}
		                });
		            			
		            	
	            	} else {
	 			console.log("ERROR: update(1)");
		  
		        }
        });
		      
	
	
};



exports.delete = function(req, res) {

	var json_responses;
	var response = [];
	console.log("here in delete")
	var username = req.param("username");
	
	var restDelUrl;
	
	var delId;
	
	var restGetUrl = restMainUrl+"?query={\"username\":\""+username+"\"}";
	var client = new Client();
		  
        client.get(restGetUrl, function(data, response_raw){
	            	if(response_raw) {
	            		console.log("in");
            			console.log(data);
            			delId = data[0]["_id"]
            			console.log("DELETE: ")
            			console.log(delId)
	            					            			
            			restDelUrl = restMainUrl+"/"+delId;
            			console.log(restDelUrl)
	            			
            			client.registerMethod("ack", restDelUrl,"DELETE")
            			client.methods.ack("",function(){
	            				console.log("Delete Done")
            			})
		            	
	            	} else {
		    		console.log("ERROR: delete");
		  
		        }
        });
		      
};




